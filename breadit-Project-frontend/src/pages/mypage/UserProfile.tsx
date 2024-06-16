/**
 * 프로필 컴포넌트
 */
import styled from 'styled-components';
import Button from '../../components/atoms/buttons/Button';
import { useAuth } from '../login/AuthContext';
import { useNavigate } from 'react-router-dom';
type UserProfileProps = {
  onEditProfile: () => void;
};

const Nickname = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #222222;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Email = styled.div`
  font-size: 16px;
  text-align: center;
  color: #777777;

  margin-bottom: 20px;
`;

const Line = styled.div`
  border-left: 1px solid #ccc;
  height: 12px;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const ActionsButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #575757;
  font-size: 1.4rem;
`;

const UserProfile: React.FC<UserProfileProps> = ({ onEditProfile }) => {
  const navigate = useNavigate();
  const { user, logout, deleteUser } = useAuth();

  const handleNavigation = () => {
    if (user && user.social_login_provider) {
      console.log('소셜 로그인으로 인증된 사용자입니다.');
      deleteUser();
    } else if (user) {
      console.log('일반 로그인 사용자입니다.');
      navigate('/mypage/check-account-delete');
    }
  };
  return (
    <div>
      <Nickname>{user?.nickname}</Nickname>
      <Email>{user?.email}</Email>
      <ButtonContainer>
        <Button
          type="button"
          text="정보 수정"
          backcolor="#575757"
          textcolor="#FFFFFF"
          width="140px"
          height="40px"
          borderradius="0px"
          onClick={onEditProfile}
        />
      </ButtonContainer>
      <ActionsContainer>
        <ActionsButton onClick={logout}>로그아웃</ActionsButton>
        <Line />
        <ActionsButton onClick={handleNavigation}>회원탈퇴</ActionsButton>
      </ActionsContainer>
    </div>
  );
};
export default UserProfile;
