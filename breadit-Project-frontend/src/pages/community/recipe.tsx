import './community.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import BigCard from '../../components/BigCard/BigCard';
import {
  useGetRecipeListApi,
  useGetRecipeByQueryApi,
} from '../../hooks/useRecipeApi';
import { useAuth } from '../login/AuthContext';

// 이미지 경로
const SearchIcon = '/search-icon.svg';
const PostIcon = '/post-icon.svg';

type RecipeCommunityParameters = {
  _id: string;
  nickname: string;
  profile?: string;
  title: string;
  content: string;
  like_count: number;
  thumbnail: string;
  location?: string | '';
};

export default function NearByPage() {
  const [recipeList, setRecipeList] = useState<RecipeCommunityParameters[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: initialData } = useGetRecipeListApi();
  const { refetch: refetchSearch } = useGetRecipeByQueryApi(
    `?q=${searchTerm}&page=${currentPage}`
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setRecipeList(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    setCurrentPage(page ? parseInt(page) : 1);
  }, [location.search]);

  const performSearch = async () => {
    try {
      const { data: searchResults } = await refetchSearch();
      setRecipeList(searchResults || []);
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

  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = recipeList.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="community_inner">
        {currentItems.length > 0 ? (
          currentItems.map((recipe) => {
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
    );
  };

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = (pageNumber: number) => {
    navigate(`?page=${pageNumber}`);
  };

  const { user } = useAuth();

  return (
    <div className="community_container">
      <div className="community">
        <h2 className="oleo-script-bold community_title">Community</h2>
        <p className="community_subtitle">나만의 레시피를 공유해요</p>
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
          <div className="community_list_content">{getCurrentItems()}</div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(recipeList.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
