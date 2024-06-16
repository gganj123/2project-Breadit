import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import likeIcon from '/heart_icon.svg';
import likeIconActive from '/heart_icon_active.svg';
import {
  usePostMagazineLikeToggleApi,
  usePostPostLikeToggleApi,
  usePostRecipeLikeToggleApi,
} from '../../../hooks/useLikeApi';

const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 0.6rem;
  font-size: 2rem;
  color: #aeaeae;
`;

type LikeProps = {
  likeCount: number;
  postId?: string | '';
  likeState: boolean;
  eventBlock?: boolean | true;
};

const ToggleLikeButton = ({
  likeCount,
  postId,
  likeState,
  eventBlock,
}: LikeProps) => {
  const location = useLocation();
  const { mutate: magazineLikeMutate } = usePostMagazineLikeToggleApi();
  const { mutate: postLikeMutate } = usePostPostLikeToggleApi();
  const { mutate: recipeLikeMutate } = usePostRecipeLikeToggleApi();

  const userId = localStorage.getItem('id');

  const heartToggle = () => {
    if (userId && postId) {
      if (location.pathname.includes('magazines')) {
        magazineLikeMutate({ userId, postId });
      } else if (location.pathname.includes('nearby')) {
        postLikeMutate({ userId, postId });
      } else if (location.pathname.includes('recipe')) {
        recipeLikeMutate({ userId, postId });
      }
    }
  };

  const navigate = useNavigate();

  const nonMember = () => {
    alert('로그인 후 이용해주세요');
    navigate('/login');
  };

  return (
    <LikeButton
      onClick={eventBlock ? (userId ? heartToggle : nonMember) : undefined}
    >
      <img src={likeState ? likeIconActive : likeIcon} />
      {likeCount ? likeCount : 0}
    </LikeButton>
  );
};

export default ToggleLikeButton;
