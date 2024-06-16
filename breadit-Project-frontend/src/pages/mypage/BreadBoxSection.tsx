import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BallTriangle } from 'react-loader-spinner';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import MyPageList from '../../components/MypageList';

const ContextWrap = styled.div`
  width: 100%;
  padding: 0 100px 100px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const ListWrapper = styled.ul`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 40px;
  li {
    width: 24%;
    margin-bottom: 30px;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0px 0px 3rem rgb(242 242 242);

    & + li {
      margin-left: 1%;
    }
    &:nth-child(5),
    &:nth-child(9) {
      margin-left: 0;
    }

    .list_img_wrapper {
      width: 100%;
      height: 21rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .subcategory {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 101px;

      p {
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .category_item {
        color: #aeaeae;
      }
    }
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

type BasicInfo = {
  basicInfo: {
    mainphotourl: string;
    placenamefull: string;
    address: {
      region: {
        newaddrfullname: string;
      };
    };
    category: {
      catename: string;
    };
  };
};

type Data = {
  [key: string]: BasicInfo | undefined;
};

export default function BreadBoxSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data>({});
  const apiUrl = `${import.meta.env.VITE_BACKEND_SERVER}`;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchData = async (id: string) => {
    try {
      const response = await axios.get(`${apiUrl}/kakao-maps/${id}`, {
        withCredentials: true,
      });
      setData((prevData) => ({
        ...prevData,
        [id]: response.data,
      }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const ids = [
      '509294248',
      '1236155226',
      '857475692',
      '1644427819',
      '1443924309',
      '1889421878',
      '2047942011',
      '1386696456',
      '550188195',
      '1599571399',
      '1978726590',
      '1661608166',
      '1030591315',
      '556221559',
      '270250168',
      '1599571399',
      '1166140575',
      '194294057',
    ];
    ids.forEach((id) => fetchData(id));
  }, []);

  // 현재 페이지에 해당하는 아이템들을 가져오는 함수
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Object.keys(data)
      .slice(indexOfFirstItem, indexOfLastItem)
      .map((id) => {
        const basicInfo = data[id]?.basicInfo;
        return basicInfo && basicInfo.mainphotourl ? (
          <MyPageList
            key={id}
            to={`https://place.map.kakao.com/${id}`}
            images={basicInfo.mainphotourl}
            titles={basicInfo.placenamefull}
            sub={basicInfo.address.region.newaddrfullname}
            rest={`#${basicInfo.category.catename}`}
          />
        ) : (
          <p key={id}>No data available</p>
        );
      });
    return currentItems;
  };

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <ContextWrap>
        <h2 className="oleo-script-bold community_title">빵집보관함</h2>

        <ListWrapper>
          {/* 데이터가 로딩 중이면 로딩 바를 표시 */}
          {isLoading && (
            <LoaderWrapper>
              <BallTriangle color="#FFCB46" />
            </LoaderWrapper>
          )}
          {/* 현재 페이지의 아이템들을 표시 */}
          {!isLoading && getCurrentItems()}
        </ListWrapper>
        {/* pagination 버튼 표시 */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(Object.keys(data).length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </ContextWrap>
    </>
  );
}
