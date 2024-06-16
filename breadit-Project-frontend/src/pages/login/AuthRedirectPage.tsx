/**
 * 소셜로그인 후 리디렉션 되는 곳 - 인가코드 추출 후 서버에 보내기
 */
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 100vw;
`;

export const LoaderWrapper = styled.div`
  size: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;
const Message = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #675a5a;
  margin-top: 30px;
`;

const AuthRedirectPage: React.FC = () => {
  const location = useLocation();
  const apiUrl = `${import.meta.env.VITE_BACKEND_SERVER}`;
  const { socialLoginSuccess } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      axios
        .post(`${apiUrl}/users/login/kakaosociallogin`, { code })
        .then((response) => {
          const { accessToken, refreshToken, user } = response.data;

          socialLoginSuccess(accessToken, refreshToken, user.id);
        })
        .catch((error) => console.error('토큰 요청 에러:', error));
    }
  }, [location]);

  return (
    <Container>
      <LoaderWrapper>
        <TailSpin color="#FFCB46" />
        <Message>로그인 처리중 입니다... </Message>
      </LoaderWrapper>
    </Container>
  );
};

export default AuthRedirectPage;
