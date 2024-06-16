import { Link, useParams } from 'react-router-dom';
import DetailContent from '../../components/Detail/Detail';
import ToggleSaveButton from '../../components/atoms/buttons/ToggleSaveButton';
import CopyUrlButton from '../../components/atoms/buttons/CopyUrlButton';
import {
  useGetRecipeByIdApi,
  useDeleteRecipeByIdApi,
} from '../../hooks/useRecipeApi';
import { usePostRecipeBookmarkToggleApi } from '../../hooks/useBookmarkApi';
import { TailSpin } from 'react-loader-spinner';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();

  const accessToken = localStorage.getItem('accessToken');

  let { data: recipeDetail, isLoading: isRecipeLoading } = useGetRecipeByIdApi({
    targetId: id,
    accessToken,
  });

  const { mutate: deleteMutate } = useDeleteRecipeByIdApi();

  const deletePostId = (id: string) => {
    deleteMutate(id);
  };

  const { mutate: recipeBookmarkMutate } = usePostRecipeBookmarkToggleApi();

  const userId = localStorage.getItem('id');

  const saveToggle = () => {
    userId &&
      id &&
      recipeBookmarkMutate({ userId, postId: id, location: 'recipe' });
  };

  if (isRecipeLoading)
    return (
      <div className="detail_loading_wrapper">
        <TailSpin color="#FFCB46" />
      </div>
    );

  return (
    <section className="detail">
      <div className="flex_default detail_top">
        <ul className="location">
          <li>
            <Link to="/community">커뮤니티</Link>
          </li>
          <li>
            <Link to="/community/recipe">레시피 소개</Link>
          </li>
        </ul>
        <div className="buttons">
          {isRecipeLoading && (
            <div className="detail_loading_wrapper">
              <TailSpin color="#FFCB46" />
            </div>
          )}
          {!isRecipeLoading && recipeDetail && (
            <ToggleSaveButton
              bookmarkState={recipeDetail.beBookmark}
              bookmarkEvent={() => saveToggle()}
            />
          )}
          <CopyUrlButton />
        </div>
      </div>
      <DetailContent
        data={
          recipeDetail !== undefined
            ? recipeDetail
            : {
                _id: '',
                user_id: '',
                nickname: '',
                profile: '',
                createdAt: '',
                title: '',
                content: '',
                like_count: '',
                beLike: false,
              }
        }
        deleteEvent={(id: string) => deletePostId(id)}
        editCategory={'recipe'}
      />
    </section>
  );
};

export default RecipeDetail;
