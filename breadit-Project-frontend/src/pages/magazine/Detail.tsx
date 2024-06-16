import { Link, useParams } from 'react-router-dom';
import DetailContent from '../../components/Detail/Detail';
import ToggleSaveButton from '../../components/atoms/buttons/ToggleSaveButton';
import CopyUrlButton from '../../components/atoms/buttons/CopyUrlButton';
import {
  useGetMagazineByIdApi,
  useDeleteMagazineByIdApi,
} from '../../hooks/useMagazineApi';
import { usePostMagazineBookmarkToggleApi } from '../../hooks/useBookmarkApi';
import { TailSpin } from 'react-loader-spinner';

const MagazineDetail = () => {
  const { id } = useParams<{ id: string }>();

  const accessToken = localStorage.getItem('accessToken');

  const { data: magazineDetail, isLoading: isMagazineloading } =
    useGetMagazineByIdApi({
      targetId: id,
      accessToken,
    });

  const { mutate: deleteMutate } = useDeleteMagazineByIdApi();

  const deleteMagazineId = (id: string) => {
    deleteMutate(id);
  };

  const { mutate: magazineBookmarkMutate } = usePostMagazineBookmarkToggleApi();

  const userId = localStorage.getItem('id');

  const saveToggle = () => {
    userId &&
      id &&
      magazineBookmarkMutate({ userId, postId: id, location: 'magazine' });
  };

  if (isMagazineloading)
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
            <Link to="/magazines">매거진</Link>
          </li>
        </ul>
        <div className="buttons">
          {magazineDetail && (
            <ToggleSaveButton
              bookmarkState={magazineDetail.beBookmark}
              bookmarkEvent={() => saveToggle()}
            />
          )}
          <CopyUrlButton />
        </div>
      </div>
      <DetailContent
        data={
          magazineDetail !== undefined
            ? magazineDetail
            : {
                _id: '',
                nickname: '',
                profile: '',
                createdAt: '',
                title: '',
                content: '',
                like_count: '',
                beLike: false,
              }
        }
        deleteEvent={(id: string) => deleteMagazineId(id)}
        editCategory={'magazine'}
      />
    </section>
  );
};

export default MagazineDetail;
