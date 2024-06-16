import { useEffect, useState } from 'react';
import { useGetBookmarkByUserIdApi } from '../../hooks/useBookmarkApi';
import BigCard, { BigCardProps } from '../../components/BigCard/BigCard';
import { useAuth } from '../login/AuthContext';
import {
  ContextWrap,
  LoaderWrapper,
  MypageList,
  MypageListTitle,
  ListWrapper,
} from './MyPage';
import { TailSpin } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination';

export default function BakeryIntroductionSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    setCurrentPage(page ? parseInt(page) : 1);
  }, [location.search]);

  const { user } = useAuth();
  const {
    data: bookmarkList,
    refetch: bookmarkRefetch,
    isLoading: isBookmarkLoading,
  } = useGetBookmarkByUserIdApi({
    userId: user?._id || '',
    query: '',
  });

  useEffect(() => {
    if (user) {
      bookmarkRefetch();
    }
  }, [user, bookmarkRefetch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    bookmarkList?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePageChange = (pageNumber: number) => {
    navigate(`?page=${pageNumber}`);
  };

  return (
    <>
      <ContextWrap>
        <MypageList>
          <MypageListTitle>
            <h2 className="community_title">저장한 게시글</h2>
          </MypageListTitle>
          <ListWrapper className="grid_04">
            {isBookmarkLoading && (
              <LoaderWrapper>
                <TailSpin color="#FFCB46" />
              </LoaderWrapper>
            )}
            {!isBookmarkLoading && currentItems && currentItems.length > 0 ? (
              currentItems.map((bookmark: BigCardProps['data']) => {
                return (
                  <BigCard
                    key={bookmark._id}
                    data={bookmark}
                    go={bookmark.location}
                    userInfo={true}
                  />
                );
              })
            ) : (
              <div className="no_post">no post</div>
            )}
          </ListWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(
              bookmarkList && bookmarkList.length
                ? bookmarkList.length / itemsPerPage
                : 1
            )}
            onPageChange={handlePageChange}
          />
        </MypageList>
      </ContextWrap>
    </>
  );
}
