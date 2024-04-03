import { Link } from 'react-router-dom';
import BannerCircle1 from '/banner_circle1.svg';
import BannerCircle2 from '/banner_circle2.svg';
import CategoriesTitle from '/Categories_title.svg';
import CategoryImg1 from '/category_img1.svg';
import CategoryImg2 from '/category_img2.svg';
import CategoryImg3 from '/category_img3.svg';
import CategoryImg4 from '/category_img4.svg';
import infoRoof from '/info_roof.svg';
import Review from '/Review.svg';
import BigCardList from '../../components/BigCardList';

import './main.css';

export default function Home() {
  let instagramList = [
    { src: './instagram1.svg' },
    { src: './instagram2.svg' },
    { src: './instagram3.svg' },
    { src: './instagram4.svg' },
    { src: './instagram1.svg' },
    { src: './instagram2.svg' },
    { src: './instagram3.svg' },
    { src: './instagram4.svg' },
    { src: './instagram1.svg' },
    { src: './instagram2.svg' },
  ];

  return (
    <>
      <article className="main_banner">
        <div className="img_box"></div>
        <div className="content_box">
          <div className="content">
            <span className="font_oleo">Hot Brand</span>
            <h3>MZ를 꼬시는 발칙한 디저트?</h3>
            <p className="point">이것이 바로 MZ ? 🧠</p>
            <p className="text">
              효창공원 인근에 위치한 ‘ 브레드읍읍 (@bread.oooo) ’ 은<br />
              기발한 아이디어를 선보이는 공간입니다. 영화 평론가 이동진 스타일의
              <br />
              빨간 안경을 쓴 콘치즈 곰자를 포함해...
            </p>
            <Link to="/" className="btn_default">
              Magazine +
            </Link>
            <img src={BannerCircle1} className="circle_right" />
          </div>
          <img src={BannerCircle2} className="circle_center" />
        </div>
      </article>
      <section className="main_cont noise_bg categories_cont">
        <div className="categories_title">
          <h3>
            <img src={CategoriesTitle} />
          </h3>
          <h4 className="main_title_text">하늘 아래 같은 빵은 없다 🍞</h4>
        </div>
        <ul className="categories">
          <li>
            <Link to="/">
              <img src={CategoryImg1} />
              <div className="flex_default box_arrow_btn">
                케이크
                <span></span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src={CategoryImg2} />
              <div className="flex_default box_arrow_btn">
                빵<span></span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src={CategoryImg3} />
              <div className="flex_default box_arrow_btn">
                구움과자
                <span></span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src={CategoryImg4} />
              <div className="flex_default box_arrow_btn">
                샌드위치
                <span></span>
              </div>
            </Link>
          </li>
        </ul>
      </section>
      <div className="infinite_roof categories_roof">
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
      </div>
      <section className="main_cont review_cont">
        <div className="main_title flex_default">
          <h3 className="main_title_text">최근 추가된 빵집 리뷰 🍰</h3>
          <img src={Review} className="review_right" />
        </div>
        <ul className="big_card_list main_card_list">
          <BigCardList />
        </ul>
      </section>
      <section className="noise_bg">
        <section className="main_cont recipe_cont">
          <div className="main_title flex_default">
            <h3 className="font_oleo eng_title">Recipe</h3>
            <p className="main_title_text">🍳 빵잘알들의 레시피</p>
          </div>
          <div className="recipe">
            <div className="img_box"></div>
            <div className="content_box">
              <div className="content">
                <div className="user_info">
                  <span
                    style={{
                      display: 'inline-block',
                      width: 70,
                      height: 70,
                      backgroundColor: '#ddd',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <p className="nickname">귀여운게 제일 좋아</p>
                </div>
                <h5>( 제목 ) 온세상 강쥐 쿠키를 구워봤어요~~!</h5>
                <p>
                  강아지 쿠키 만드는 방법 공유드립니다!! 우선 밀가루와 뭐쩌구가
                  <br />
                  필요합니다. 그리고 최고의 손재주를 가지면 되는데요!
                  <br />
                  <br />
                  ** 재료 공유 ( 정확하게 계량해주세요. )
                  <br />
                  금손 100g ...
                </p>
                <Link to="/" className="go_recipe" />
              </div>
            </div>
          </div>
        </section>
        <div className="infinite_roof info_roof">
          <img src={infoRoof} alt="" />
          <img src={infoRoof} alt="" />
          <img src={infoRoof} alt="" />
          <img src={infoRoof} alt="" />
        </div>
        <section className="main_cont instagram_cont">
          <div className="main_title flex_default">
            <h3 className="font_oleo eng_title">Instagram</h3>
            <p className="main_title_text">
              <Link to="/">🥐 브레딧 인스타그램 구경하기</Link>
            </p>
          </div>
          <ul className="instagram_list">
            {instagramList.map((img, index) => {
              return (
                <li className="img_box" key={index}>
                  <Link to="/">
                    <img src={img.src} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </>
  );
}
