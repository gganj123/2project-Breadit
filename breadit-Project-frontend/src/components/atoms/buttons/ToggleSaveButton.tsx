import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import saveIcon from '/save_icon.svg';
import saveIconActive from '/save_icon_active.svg';

const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 0.6rem;
  font-size: 2rem;
  color: #aeaeae;
`;

type SaveProps = {
  bookmarkState: boolean;
  bookmarkEvent: () => void;
};

const ToggleSaveButton = ({ bookmarkState, bookmarkEvent }: SaveProps) => {
  const userId = localStorage.getItem('id');

  const navigate = useNavigate();

  const nonMember = () => {
    alert('로그인 후 이용해주세요');
    navigate('/login');
  };

  return (
    <LikeButton onClick={userId ? bookmarkEvent : nonMember}>
      <img src={bookmarkState ? saveIconActive : saveIcon} />
    </LikeButton>
  );
};

export default ToggleSaveButton;
