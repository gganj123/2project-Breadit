import SearchIcon from '/search-icon.svg';
import PostIcon from '/post-icon.svg';
import './community.css';
import CategoryList from '../../components/CategoryList';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function NearByPage() {
  const [postData, setPostData] = useState([]);

  // 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts/');
      setPostData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 가져옴
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="community_container">
        <div className="community">
          <h2 className="oleo-script-bold community_title">Community</h2>
          <p className="community_subtitle">우리 동네 베이커리를 소개합니다!</p>
          <div className="head_content box_wrapper">
            <div className="community_search box_wrapper">
              <input type="text" placeholder="검색어를 입력하세요." />
              <img src={SearchIcon} className="icon" alt="search icon" />
            </div>
            <div className="community_post_btn">
              <Link to="/community/edit">
                <img src={PostIcon} className="icon" alt="search icon" />
              </Link>
            </div>
          </div>
          <div className="community_list">
            <div className="community_list_title box_wrapper">
              <h3>우리 동네 베이커리를 소개합니다!</h3>
            </div>
            <div className="community_list_content">
              <CategoryList
                to="/community/nearby"
                images={postData.map((post: any) => post.images)}
                titles={postData.map((post: any) => post.title)}
                nickname={postData.map((post: any) => post.nickname)}
                likes={[1, 2, 3]}
                usersrc={['#빵집']}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
