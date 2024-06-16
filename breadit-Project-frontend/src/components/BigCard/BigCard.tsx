import { Link } from 'react-router-dom';
import ToggleLikeButton from '../atoms/buttons/ToggleLiketButton';
import NoProfile from '/no_profile.svg';
import { BigCardStyled, ContentBoxStyled } from './BigCard.styles';

export type BigCardProps = {
  data: {
    _id: string;
    nickname: string;
    profile?: string;
    title: string;
    content: string;
    like_count: number;
    thumbnail: string;
    location?: string | '';
  };
  userInfo?: boolean;
  admin?: boolean;
  handleCheckboxChange?: (id: string, checked: boolean) => void;
  isChecked?: boolean;
  go?: string;
  linkUse?: boolean | false;
};

const BigCardList = ({
  data,
  userInfo,
  admin,
  handleCheckboxChange,
  isChecked,
  go,
  linkUse,
}: BigCardProps) => {
  const { _id, nickname, profile, title, content, like_count, thumbnail } =
    data;

  const noImgContent = () => {
    const imgFilter = content.replace(/<img.*?>/g, '');

    const HTML = { __html: imgFilter };
    return HTML;
  };

  return (
    <BigCardStyled>
      {admin && handleCheckboxChange && (
        <input
          type="checkbox"
          value={_id}
          onChange={(e) => handleCheckboxChange(_id, e.target.checked)}
          className="checkbox"
          checked={isChecked}
        />
      )}
      {userInfo && (
        <div className="user_info">
          <div className="profile">
            <img src={profile ? profile : NoProfile} />
          </div>
          <p>{nickname}</p>
        </div>
      )}
      <div className="img_box">
        {!linkUse ? (
          <Link
            to={
              go == 'magazines'
                ? `/magazines/${_id}`
                : go == 'posts'
                  ? `/community/nearby/${_id}`
                  : `/community/recipe/${_id}`
            }
          >
            <img src={thumbnail} />
          </Link>
        ) : (
          <img src={thumbnail} />
        )}
      </div>
      <ContentBoxStyled>
        <h5>
          <Link
            to={
              location.pathname.includes('magazine')
                ? `/magazines/${_id}`
                : `/community/nearby/${_id}`
            }
          >
            {title}
          </Link>
        </h5>
        <div className="text" dangerouslySetInnerHTML={noImgContent()} />
        <ToggleLikeButton
          likeCount={like_count ? like_count : 0}
          likeState={false}
          eventBlock={false}
        />
      </ContentBoxStyled>
    </BigCardStyled>
  );
};

export default BigCardList;
