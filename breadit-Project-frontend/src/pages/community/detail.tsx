import { Link, useParams } from 'react-router-dom';
import DetailContent from '../../components/Detail/Detail';
import ToggleSaveButton from '../../components/atoms/buttons/ToggleSaveButton';
import CopyUrlButton from '../../components/atoms/buttons/CopyUrlButton';
import {
  useGetPostByIdApi,
  useDeletePostByIdApi,
} from '../../hooks/usePostApi';
import { usePostPostBookmarkToggleApi } from '../../hooks/useBookmarkApi';
import { TailSpin } from 'react-loader-spinner';

const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();

  const accessToken = localStorage.getItem('accessToken');

  let { data: postDetail, isLoading: isPostLoading } = useGetPostByIdApi({
    targetId: id,
    accessToken,
  });

  const { mutate: deleteMutate } = useDeletePostByIdApi();

  const deletePostId = (id: string) => {
    deleteMutate(id);
  };

  const { mutate: postBookmarkMutate } = usePostPostBookmarkToggleApi();

  const userId = localStorage.getItem('id');

  const saveToggle = () => {
    userId &&
      id &&
      postBookmarkMutate({ userId, postId: id, location: 'post' });
  };

  if (isPostLoading)
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
            <Link to="/community/nearby">베이커리 소개</Link>
          </li>
        </ul>
        <div className="buttons">
          {isPostLoading && (
            <div className="detail_loading_wrapper">
              <TailSpin color="#FFCB46" />
            </div>
          )}
          {!isPostLoading && postDetail && (
            <ToggleSaveButton
              bookmarkState={postDetail.beBookmark}
              bookmarkEvent={() => saveToggle()}
            />
          )}
          <CopyUrlButton />
        </div>
      </div>
      <DetailContent
        data={
          postDetail !== undefined
            ? postDetail
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
        editCategory={'default'}
      />
    </section>
  );
};

export default CommunityDetail;
