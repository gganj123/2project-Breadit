import './community.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BigCard from '../../components/BigCard/BigCard';
import RightArrow from '/right-arrow.svg';
import { useGetPostByQueryApi } from '../../hooks/usePostApi';
import { useGetRecipeByQueryApi } from '../../hooks/useRecipeApi';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import { useAuth } from '../login/AuthContext';

// 이미지 경로
const SearchIcon = '/search-icon.svg';
const PostIcon = '/post-icon.svg';

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rem;
  grid-column: 5 / 1;
`;

type PostCommunityParameters = {
  _id: string;
  user_id: string;
  nickname: string;
  profile: string;
  title: string;
  content: string;
  images: string; // 이미지 경로 배열 등의 형태로 가정합니다.
  thumbnail: string;
  like_count: number;
  // 다른 필드들도 필요에 따라 추가
};

const CommunityPage = () => {
  const [postList, setPostList] = useState<PostCommunityParameters[]>([]);
  const [recipeList, setRecipeList] = useState<PostCommunityParameters[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: postData,
    refetch: postRefetchSearch,
    isLoading: isPostLoading,
  } = useGetPostByQueryApi(`?q=${searchQuery}&limit=4`);
  const {
    data: recipeData,
    refetch: recipeRefetchSearch,
    isLoading: isRecipeLoading,
  } = useGetRecipeByQueryApi(`?q=${searchQuery}&limit=4`);

  useEffect(() => {
    if (postData && recipeData) {
      setPostList(postData);
      setRecipeList(recipeData);
    }
  }, [postData, recipeData, searchQuery]);

  const performSearch = async () => {
    try {
      const { data: searchPostResults } = await postRefetchSearch();
      setPostList(searchPostResults || []);
      const { data: searchRecipeResults } = await recipeRefetchSearch();
      setRecipeList(searchRecipeResults || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleChangeSearchQuery = () => {
    setSearchQuery(searchTerm);
    performSearch();
  };

  // 검색어 입력 시 상태 업데이트 함수
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const { user } = useAuth();

  return (
    <div className="community_container">
      <div className="community">
        <h2 className="oleo-script-bold community_title">Community</h2>
        <div className="head_content box_wrapper">
          <div className="community_search box_wrapper">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleChangeSearchQuery();
                }
              }}
            />
            <img
              src={SearchIcon}
              className="icon"
              alt="search icon"
              onClick={() => {
                handleChangeSearchQuery();
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {user && (
            <div className="community_post_btn">
              <Link to="/community/edit">
                <img src={PostIcon} className="icon" alt="search icon" />
              </Link>
            </div>
          )}
        </div>
        <div className="community_list">
          <div className="community_list_title box_wrapper">
            <h3>우리 동네 베이커리를 소개합니다!</h3>
            <Link to="/community/nearby">
              More <img src={RightArrow} className="icon" alt="arrow icon" />
            </Link>
          </div>
          <div className="community_inner">
            {isPostLoading ? (
              <LoaderWrapper>
                <TailSpin color="#FFCB46" />
              </LoaderWrapper>
            ) : postList.length > 0 ? (
              postList.map((post) => {
                return (
                  <BigCard
                    data={post}
                    key={post._id}
                    go={'posts'}
                    userInfo={true}
                  />
                );
              })
            ) : (
              <div className="no_post">no post</div>
            )}
          </div>
        </div>
        <div className="community_list">
          <div className="community_list_title box_wrapper">
            <h3>나만의 레시피를 소개해요</h3>
            <Link to="/community/recipe">
              More <img src={RightArrow} className="icon" alt="arrow icon" />
            </Link>
          </div>

          <div className="community_inner">
            {isRecipeLoading ? (
              <LoaderWrapper>
                <TailSpin color="#FFCB46" />
              </LoaderWrapper>
            ) : recipeList.length > 0 ? (
              recipeList.map((recipe) => {
                return (
                  <BigCard
                    data={recipe}
                    key={recipe._id}
                    go={'recipes'}
                    userInfo={true}
                  />
                );
              })
            ) : (
              <div className="no_post">no post</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommunityPage;
