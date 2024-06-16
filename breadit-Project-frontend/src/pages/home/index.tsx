import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import CategoryImg1 from '/icons/category_img1.svg';
import CategoryImg2 from '/icons/category_img2.svg';
import CategoryImg3 from '/icons/category_img3.svg';
import CategoryImg4 from '/icons/category_img4.svg';
import MainCategories from './MainCategories';
import Review from '/Review.svg';
import MainBanner, { BannerProps } from './MainBanner';
import BigCard, { BigCardProps } from '../../components/BigCard/BigCard';
import MainInstagramImg from './MainInstagramImg';
import { useGetMagazineByQueryApi } from '../../hooks/useMagazineApi';
import { useGetPostByQueryApi } from '../../hooks/usePostApi';
import { useGetRecipeByQueryApi } from '../../hooks/useRecipeApi';
import {
  MainBannerStyled,
  CategoriesStyled,
  PostStyled,
  RecipeStyled,
  RecipeGoStyled,
  InstagramStyled,
  InfiniteRoofStyled,
} from './home';
import NoProfile from '/no_profile.svg';
import { sliceDate } from '../../utils';
import { TailSpin } from 'react-loader-spinner';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './main.css';

const Home = () => {
  const { data: magazineBanner, isLoading: isMagazineLoading } =
    useGetMagazineByQueryApi('?limit=5');

  const { data: postList } = useGetPostByQueryApi('?limit=6');

  const { data: recipeData } = useGetRecipeByQueryApi(
    '?sort=like_count&limit=1'
  );

  const categories = [
    { go: '/map', src: CategoryImg1, categoryName: '케이크' },
    { go: '/map', src: CategoryImg2, categoryName: '빵집' },
    { go: '/map', src: CategoryImg3, categoryName: '쿠키' },
    { go: '/map', src: CategoryImg4, categoryName: '샌드위치' },
  ];

  const bannerSettings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    autoplay: true,
  };

  const postSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    draggable: true,
    swipeToSlide: false,
  };

  type RecipeDataProps = {
    _id: string;
    thumbnail: string;
    profile: string;
    nickname: string;
    createdAt: string;
    title: string;
    content: string;
  };

  const noImgContent = () => {
    const imgFilter = recipeData[0].content.replace(/<img.*?>/g, '');

    const HTML = { __html: imgFilter };
    return HTML;
  };

  if (isMagazineLoading)
    return (
      <div className="detail_loading_wrapper">
        <TailSpin color="#FFCB46" />
      </div>
    );

  return (
    <>
      <MainBannerStyled>
        <Slider {...bannerSettings}>
          {magazineBanner &&
            magazineBanner.map((banner: BannerProps['data']) => (
              <MainBanner data={banner} key={banner._id} />
            ))}
        </Slider>
      </MainBannerStyled>
      <CategoriesStyled>
        <div className="categories_title">
          <h3 className="font_oleo">Categories</h3>
          <p>하늘 아래 같은 빵은 없다 🍞</p>
        </div>
        <ul className="categories">
          {categories.map((category, index) => {
            return (
              <MainCategories // 카테고리
                go={category.go}
                src={category.src}
                categoryName={category.categoryName}
                key={index}
              />
            );
          })}
        </ul>
      </CategoriesStyled>
      <InfiniteRoofStyled className="categories_roof">
        <p>
          Sandwich&nbsp;&nbsp;&nbsp;cupcake&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;financier&nbsp;&nbsp;&nbsp;macaron&nbsp;&nbsp;&nbsp;scone&nbsp;&nbsp;&nbsp;♥︎&nbsp;&nbsp;&nbsp;cookie&nbsp;&nbsp;&nbsp;toast&nbsp;&nbsp;&nbsp;bread&nbsp;&nbsp;&nbsp;
          pundcake&nbsp;&nbsp;&nbsp;♦︎&nbsp;&nbsp;&nbsp;Sandwich&nbsp;&nbsp;&nbsp;cupcake&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;financier&nbsp;&nbsp;&nbsp;macaron&nbsp;&nbsp;&nbsp;scone&nbsp;&nbsp;&nbsp;♥︎&nbsp;&nbsp;&nbsp;cookie&nbsp;&nbsp;&nbsp;
          toast&nbsp;&nbsp;&nbsp;Sandwich&nbsp;&nbsp;&nbsp;cupcake&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;financier&nbsp;&nbsp;&nbsp;macaron&nbsp;&nbsp;&nbsp;scone&nbsp;&nbsp;&nbsp;♥︎&nbsp;&nbsp;&nbsp;cookie&nbsp;&nbsp;&nbsp;toast&nbsp;&nbsp;&nbsp;
          bread&nbsp;&nbsp;&nbsp;pundcake&nbsp;&nbsp;&nbsp;♦︎&nbsp;&nbsp;&nbsp;Sandwich&nbsp;&nbsp;&nbsp;cupcake&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;financier&nbsp;&nbsp;&nbsp;macaron&nbsp;&nbsp;&nbsp;scone&nbsp;&nbsp;&nbsp;♥︎&nbsp;&nbsp;&nbsp;cookie&nbsp;&nbsp;&nbsp;
          toast&nbsp;&nbsp;Sandwich&nbsp;&nbsp;&nbsp;cupcake&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;financier&nbsp;&nbsp;&nbsp;macaron&nbsp;&nbsp;&nbsp;scone&nbsp;&nbsp;&nbsp;♥︎&nbsp;&nbsp;&nbsp;cookie&nbsp;&nbsp;&nbsp;toast&nbsp;&nbsp;&nbsp;bread&nbsp;&nbsp;&nbsp;
          pundcake&nbsp;&nbsp;&nbsp;♦︎&nbsp;&nbsp;&nbsp;Sandwich&nbsp;&nbsp;&nbsp;cupcake&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;financier&nbsp;&nbsp;&nbsp;macaron&nbsp;&nbsp;&nbsp;scone&nbsp;&nbsp;&nbsp;♥︎&nbsp;&nbsp;&nbsp;cookie&nbsp;&nbsp;&nbsp;
          toast&nbsp;&nbsp;&nbsp;Sandwich&nbsp;&nbsp;&nbsp;cupcake&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;financier&nbsp;&nbsp;&nbsp;macaron&nbsp;&nbsp;&nbsp;scone&nbsp;&nbsp;&nbsp;♥︎&nbsp;&nbsp;&nbsp;cookie&nbsp;&nbsp;&nbsp;toast&nbsp;&nbsp;&nbsp;
          bread&nbsp;&nbsp;&nbsp;pundcake&nbsp;&nbsp;&nbsp;♦︎&nbsp;&nbsp;&nbsp;Sandwich&nbsp;&nbsp;&nbsp;cupcake&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;financier&nbsp;&nbsp;&nbsp;macaron&nbsp;&nbsp;&nbsp;scone&nbsp;&nbsp;&nbsp;♥︎&nbsp;&nbsp;&nbsp;cookie&nbsp;&nbsp;&nbsp;
          toast
        </p>
      </InfiniteRoofStyled>
      <PostStyled className="main_cont">
        <div className="main_title flex_default">
          <h3 className="main_title_text">
            <Link to="/community/nearby">최근 추가된 빵집 추천! 🍰</Link>
          </h3>
          <img src={Review} className="review_right" />
        </div>
        <Slider {...postSettings}>
          {postList &&
            postList.map((post: BigCardProps['data'], index: number) => {
              return (
                <div className="slide_item" key={index}>
                  <BigCard
                    data={post}
                    key={post._id}
                    userInfo={true}
                    go={'posts'}
                    linkUse={true}
                  />
                </div>
              ); // 커뮤니티 - 베이커리 소개
            })}
        </Slider>
      </PostStyled>
      <RecipeStyled className="main_cont">
        <div className="main_title flex_default">
          <h3 className="font_oleo eng_title">Recipe</h3>
          <p className="main_title_text">
            <Link to="/community/recipe">🍳 빵잘알들의 레시피</Link>
          </p>
        </div>
        {recipeData &&
          recipeData.map((recipe: RecipeDataProps, index: number) => {
            return (
              <section className="recipe" key={index}>
                <div className="img_box">
                  <img src={recipe.thumbnail} alt="메인썸네일" />
                </div>
                <div className="content_box">
                  <div className="user_info">
                    <div className="profile">
                      <img src={recipe.profile ? recipe.profile : NoProfile} />
                    </div>
                    <p>
                      <span className="nickname">{recipe.nickname}</span>
                      <span className="date">
                        {recipe.createdAt && sliceDate(recipe.createdAt)}
                      </span>
                    </p>
                  </div>
                  <h5>
                    <Link to={`/community/recipe/${recipe._id}`}>
                      {recipe.title}
                    </Link>
                  </h5>
                  <div className="content">
                    <div dangerouslySetInnerHTML={noImgContent()} />
                    <RecipeGoStyled
                      to={`/community/recipe/${recipe._id}`}
                      className="go_recipe"
                    />
                  </div>
                </div>
              </section>
            );
          })}
      </RecipeStyled>
      <InfiniteRoofStyled className="info_roof">
        <span className="font_oleo">we loves bread, we are breadit!</span>
        <span className="font_oleo">we loves bread, we are breadit!</span>
        <span className="font_oleo">we loves bread, we are breadit!</span>
        <span className="font_oleo">we loves bread, we are breadit!</span>
      </InfiniteRoofStyled>
      <InstagramStyled className="main_cont">
        <div className="main_title flex_default">
          <h3 className="font_oleo eng_title">Instagram</h3>
          <p className="main_title_text">
            <Link
              to="https://www.instagram.com/breadit__?igsh=MTFjdW82YmF5MDR6Ng%3D%3D&utm_source=qr"
              target="_blank"
            >
              🥐 브레딧 인스타그램 구경하기
            </Link>
          </p>
        </div>
        <MainInstagramImg />
      </InstagramStyled>
    </>
  );
};

export default Home;
