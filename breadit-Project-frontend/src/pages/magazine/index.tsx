import Slider from 'react-slick';
import BigCard from '../../components/BigCard/BigCard';
import MagazineBanner, { BannerProps } from './MagazineBanner';
import LinkDefault from '../../components/atoms/links/LinkDefault';
import {
  useGetMagazineListApi,
  useGetMagazineByQueryApi,
} from '../../hooks/useMagazineApi';
import { useAuth } from '../login/AuthContext';
import { TailSpin } from 'react-loader-spinner';

import './magazine_main.css';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

const Magazine = () => {
  const { data: magazineList } = useGetMagazineListApi();
  const { data: magazineBanner, isLoading: isMagazineLoading } =
    useGetMagazineByQueryApi('?limit=5');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    setCurrentPage(page ? parseInt(page) : 1);
  }, [location.search]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendDots: (dots: React.ReactNode[]) => (
      <div>
        <ul style={{ margin: '0px' }} className="magazine_dots">
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: number) => {
      return (
        <span className="customPaging">
          <span className="currentPage">{i + 1}</span>/
          <span className="totalPage">
            {magazineBanner && magazineBanner.length}
          </span>
        </span>
      );
    },
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    magazineList?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePageChange = (pageNumber: number) => {
    navigate(`?page=${pageNumber}`);
  };

  const { user } = useAuth();

  if (isMagazineLoading)
    return (
      <div className="detail_loading_wrapper">
        <TailSpin color="#FFCB46" />
      </div>
    );

  return (
    <>
      <article className="magazine_banner">
        <Slider {...settings}>
          {magazineBanner &&
            magazineBanner.map((banner: BannerProps['data']) => {
              return <MagazineBanner data={banner} key={banner._id} />;
            })}
        </Slider>
      </article>
      <section className="main_cont magazine">
        <div className="main_title flex_default">
          <h3 className="main_title_text">
            놓치면 아쉬울, 새로운 베이커리 소식 🍰
          </h3>
          {user && user.user_role == 'editor' && (
            <LinkDefault text={'Post +'} go={'/magazines/edit'} />
          )}
        </div>

        <div className="magazine_card_list">
          {currentItems.length > 0 ? (
            currentItems.map((magazine) => (
              <BigCard data={magazine} key={magazine._id} go={'magazines'} />
            ))
          ) : (
            <div className="no_post">No post</div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(
            magazineList && magazineList.length
              ? magazineList.length / itemsPerPage
              : 1
          )}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
};

export default Magazine;
