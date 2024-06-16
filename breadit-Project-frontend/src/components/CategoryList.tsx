import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LikeIcon from '/heart_icon.svg';
import LikeIconActive from '/heart_icon_active.svg';
import Noimg from '/no_img.svg';
import axios from 'axios';

type Props = {
  to: string;
  images: string[] | string[][];
  thumbnail: string[];
  titles: string[];
  nickname: string[];
  likes: number[];
  usersrc: string[];
  postIdArray: string[]; // postIdArray 추가
};

const CategoryList: React.FC<Props> = ({
  to,
  images,
  thumbnail,
  titles,
  nickname,
  likes,
  usersrc,
  postIdArray, // postIdArray 추가
}) => {
  const [isLikedByUserArray, setIsLikedByUserArray] = useState<boolean[]>(
    Array(images.length).fill(false)
  );

  useEffect(() => {
    // 로컬 스토리지에서 좋아요 상태를 가져와 업데이트합니다.
    const likedImagesFromStorage = JSON.parse(
      localStorage.getItem('likedImages') || '{}'
    );
    setIsLikedByUserArray(likedImagesFromStorage);
  }, [thumbnail]);

  const toggleLike = async (index: number) => {
    try {
      const user_id_local = localStorage.getItem('user_id');
      const postId = postIdArray[index]; // 해당 포스트의 _id 값 가져오기

      const postData = {
        user_id: user_id_local,
        post_id: postId,
      };

      const response = await axios.post(
        'http://localhost:5000/api/likes/posttoggle',
        postData
      );

      const likeCountsResponse = await axios.post(
        `http://localhost:5000/api/likes/post/${postId}`,
        {
          user_id: user_id_local,
        }
      );
      const countLike = likeCountsResponse.data.post.like_count;

      // 좋아요 상태를 업데이트합니다.
      setIsLikedByUserArray((prevIsLikedByUserArray) => {
        const newIsLikedByUserArray = Array.from(prevIsLikedByUserArray); // 이 부분 수정
        newIsLikedByUserArray[index] = !newIsLikedByUserArray[index];
        return newIsLikedByUserArray;
      });

      // 좋아요 상태를 로컬 스토리지에 저장합니다.
      localStorage.setItem(
        'likedImages',
        JSON.stringify({
          ...isLikedByUserArray,
          [postId]: !isLikedByUserArray[index],
        })
      );

      // 좋아요 개수 업데이트
      likes[index] = countLike;
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const firstValues = images.map((item) => {
    if (typeof item === 'string') {
      return item.replace(/[\[\]"]/g, ''); // 대괄호와 큰따옴표 제거
    } else if (Array.isArray(item) && item.length > 0) {
      return item[0].replace(/[\[\]"]/g, ''); // 대괄호와 큰따옴표 제거
    } else {
      return Noimg;
    }
  });

  return (
    <ul className="community_list_item">
      {images.map((image, index) => (
        <li key={index}>
          <div className="box_wrapper list_title">
            <div className="user_img_wrapper">
              <img src={usersrc[index]} alt={titles[index]} />
            </div>
            <p>{nickname[index] || ''}</p>
          </div>
          <div className="list_img_wrapper">
            <Link to={`${to}/${postIdArray[index]}`}>
              <img
                src={
                  typeof thumbnail[index] === 'string'
                    ? thumbnail[index]
                    : Noimg
                }
                alt={titles[index]}
              />
            </Link>
          </div>
          <div className="subcategory">
            <p>{titles[index] || ''}</p>
            <div className="like_icon_wrapper">
              <img
                src={isLikedByUserArray[index] ? LikeIconActive : LikeIcon}
                className="like"
                alt="like icon"
                onClick={() => toggleLike(index)}
              />
              <p>{likes[index]}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
