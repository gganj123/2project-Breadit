import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const apiUrl = `${import.meta.env.VITE_BACKEND_SERVER}`;

type User = {
  _id?: string;
  nickname?: string;
  email?: string;
  accessToken?: string;
  profile?: string; // 프로필 이미지 추가
  social_login_provider?: string;
  newPassword?: string;
  user_role?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserInfo: (userData: Partial<User>) => Promise<void>; // 사용자 정보 업데이트 함수 추가
  deleteUser: () => Promise<void>;
  socialLoginSuccess: (
    accessToken: string,
    refreshToken: string,
    userId: string
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};
// AuthProvider 구현
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401 && !error.config._retry) {
          error.config._retry = true;
          const currentAccessToken = localStorage.getItem('accessToken'); // 현재 사용 중인 액세스 토큰 가져오기
          console.log('현재 사용 중인 토큰:', currentAccessToken);
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            console.error('No refresh token available');
            logout();
            return Promise.reject(error);
          }

          try {
            const res = await axios.post(`${apiUrl}/users/refreshToken`, {
              refreshToken,
            });
            const { accessToken, userId } = res.data;
            console.log('새로 발급받은 토큰:', accessToken);
            console.log('사용자 ID:', userId);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('id', userId);
            console.log('토큰 갱신 성공');
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(error.config);
          } catch (refreshError) {
            console.error('토큰 갱신 실패:', refreshError);
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    const loadUser = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('id');
      if (accessToken && userId) {
        await fetchUserData(userId, accessToken);
      }
    };
    loadUser();
  }, []);

  // 유저 정보 조회
  const fetchUserData = async (userId: string, accessToken: string) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('fetchUserData response:', response);
      const { password, ...user } = response.data;
      setUser({
        ...user,
      });
      console.log('user정보:', user);

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setLoading(false);
    }
  };
  // 유저 정보 수정
  const updateUserInfo = async (userData: Partial<User>) => {
    if (!user) return;
    try {
      const userId = localStorage.getItem('id');
      await axios.put(`${apiUrl}/users/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      const updatedUserData = await axios.get(`${apiUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      setUser(updatedUserData.data);
      navigate('/mypage');
      console.log('User info updated successfully');
    } catch (error) {
      console.error('Error updating user info:', error);
    } finally {
      setLoading(false);
    }
  };

  // 로그인
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/users/login`, {
        email,
        password,
      });
      const { accessToken, refreshToken, decodedAccessToken } = response.data;
      console.log('로그인 성공:', {
        accessToken,
        refreshToken,
        decodedAccessToken,
      });
      console.log(response.data.decodedAccessToken);
      const userId = decodedAccessToken.userId;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('id', userId);

      navigate('/');
      await fetchUserData(userId, accessToken);
      setTimeout(
        () => {
          if (window.confirm('토큰 갱신 처리중 입니다..')) {
            navigate('/');
            window.location.reload();
          }
        },
        60 * 60 * 1000
      );
    } catch (error) {
      toast.error('로그인 정보를 다시 입력해주세요.');
    }
  };
  // 소셜로그인 성공 후 호출할 함수
  const socialLoginSuccess = async (
    accessToken: string,
    refreshToken: string,
    userId: string
  ) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('id', userId);
    localStorage.setItem('canEditAccess', 'true');

    await fetchUserData(userId, accessToken);
    navigate('/');
    setTimeout(
      () => {
        if (
          window.confirm(
            '세션을 갱신하고 있습니다. 계속해서 서비스를 이용하시겠습니까?'
          )
        ) {
          navigate('/');
          window.location.reload();
        }
      },
      60 * 60 * 1000
    );
  };

  // 로그아웃
  const logout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.log('No user is currently logged in.');
      return;
    }
    if (window.confirm('로그아웃 하시겠습니까?')) {
      try {
        await axios.post(
          `${apiUrl}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        localStorage.clear();
        setUser(null);
        navigate('/');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  };

  // 회원 탈퇴
  const deleteUser = async () => {
    if (
      window.confirm(
        '정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
      )
    ) {
      try {
        const userId = localStorage.getItem('id');
        await axios.delete(`${apiUrl}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        localStorage.clear();
        setUser(null);
        navigate('/');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('회원 탈퇴에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUserInfo,
        deleteUser,
        socialLoginSuccess,
      }}
    >
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
