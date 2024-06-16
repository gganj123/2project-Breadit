import { useEffect, useState } from 'react';
import { useGetPostByUserIdQueryApi } from '../../hooks/usePostApi';
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
import Pagination from '../../components/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

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
    data: postUserList,
    refetch: postRefetch,
    isLoading: isPostLoading,
  } = useGetPostByUserIdQueryApi({
    userId: user?._id || '',
    query: '',
  });

  useEffect(() => {
    if (user) {
      postRefetch();
    }
  }, [user]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    postUserList?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePageChange = (pageNumber: number) => {
    navigate(`?page=${pageNumber}`);
  };

  return (
    <>
      <ContextWrap>
        <MypageList>
          <MypageListTitle>
            <h2 className="community_title">
              우리 동네 베이커리를 소개합니다!
            </h2>
          </MypageListTitle>
          <ListWrapper className="grid_04">
            {/* 데이터가 로딩 중이면 로딩 바를 표시 */}
            {isPostLoading && (
              <LoaderWrapper>
                <TailSpin color="#FFCB46" />
              </LoaderWrapper>
            )}
            {/* 데이터가 있는지 확인하고 mainphotourl이 있는지 확인합니다 */}
            {!isPostLoading && currentItems && currentItems.length > 0 ? (
              currentItems.map((post: BigCardProps['data']) => {
                return (
                  <BigCard
                    key={post._id}
                    data={post}
                    go={'posts'}
                    userInfo={false}
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
              postUserList && postUserList.length
                ? postUserList.length / itemsPerPage
                : 1
            )}
            onPageChange={handlePageChange}
          />
        </MypageList>
      </ContextWrap>
    </>
  );
}
