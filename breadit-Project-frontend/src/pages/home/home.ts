import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const MainBannerStyled = styled.article`
  background-color: #eee;
  position: relative;

  .slick-slider {
    height: 72rem;
  }

  .slick-arrow {
    top: 94%;
    bottom: auto;
    z-index: 99;
    width: 1.4rem;
    height: 1.4rem;
    border-top: solid 2px #656565;
    border-right: solid 2px #656565;
  }

  .slick-prev {
    left: calc(50% - 4rem);
    transform: rotate(-135deg);
  }

  .slick-next {
    right: calc(50% - 4rem);
    transform: rotate(45deg);
  }

  .slick-arrow::before {
    display: none;
  }
`;

export const CategoriesStyled = styled.section`
  padding: 10rem;

  .categories_title {
    text-align: center;
  }

  .categories_title h3 {
    font-size: 10rem;
    color: #59a47e;
  }

  .categories_title p {
    font-size: 2.6rem;
    font-weight: 500;
    margin-top: 2rem;
  }

  .categories {
    display: flex;
    justify-content: center;
    gap: 6rem;
    margin-top: 6rem;
  }

  .categories li {
    width: 30rem;
    text-align: center;
  }

  .categories .box_arrow_btn {
    margin-top: 2rem;
  }
`;

export const PostStyled = styled.section`
  padding-right: 0 !important;

  .main_title {
    position: relative;
    padding-right: 10rem;
    align-items: flex-end;
  }

  .main_title_text {
    padding-bottom: 1rem;
  }

  .slick-prev {
    display: none !important;
  }

  .slick-next {
    right: auto;
    left: -4rem;
  }

  .slick-next::before {
    content: '';
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border-left: solid 2px #575757;
    border-bottom: solid 2px #575757;
    transform: rotate(45deg);
  }

  .slick-slide > div {
    margin-right: 3rem;
  }

  .slide_item {
    max-width: 46rem;
  }
`;

export const RecipeStyled = styled.section`
  .recipe {
    display: flex;
    box-shadow: 0px 0px 3rem rgb(242 242 242);
    border-radius: 2rem;
    overflow: hidden;
  }

  .recipe > div {
    width: 50%;
  }

  .recipe .img_box {
    background-color: #ddd;
    height: 50rem;
    overflow: hidden;
  }

  .recipe .content_box {
    background-color: #fff;
    border-left: 0;
    padding: 6rem;
    position: relative;
    min-height: 46rem;
  }

  .recipe .content_box h5 {
    font-size: 2.4rem;
    font-weight: 500;
    margin: 2.6rem 0;
  }

  .recipe .content_box p {
    font-size: 1.8rem;
    line-height: 1.6;
  }

  .recipe .user_info {
    display: flex;
    gap: 1.8rem;
    align-items: center;
  }

  .recipe .profile {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: #eee;
    border: solid 1px #eee;
  }

  .recipe .profile img {
    width: 100%;
  }

  .recipe .user_info p {
    font-weight: 500;
    display: flex;
    flex-flow: column;
    gap: 1rem;
  }

  .recipe .user_info p .nickname {
    font-size: 2rem;
    font-weight: 400;
  }

  .recipe .user_info p .date {
    font-size: 1.6rem;
    color: #888;
  }

  .recipe .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    overflow: hidden;
    width: calc(100% - 10rem);
  }

  .recipe .content * {
    font-size: 1.8rem;
    color: #575757;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    line-height: 1.5;
  }
`;

export const RecipeGoStyled = styled(Link)`
  display: inline-block;
  width: 6.8rem;
  height: 6.8rem;
  background-color: #f9cadb;
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  border-radius: 50%;

  &::before,
  &::after {
    content: '';
    width: 2.8rem;
    height: 2px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  &::after {
    transform: translate(-50%, -50%);
  }
`;

export const InstagramStyled = styled.section`
  border-top: 0;

  & .instagram_list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }

  & .instagram_list li {
    overflow: hidden;
  }

  & .instagram_list li img {
    width: 100%;
    transition: transform 0.2s;
  }

  & .instagram_list li img:hover {
    transform: scale(1.1);
  }
`;

export const RoofAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
`;

export const InfiniteRoofStyled = styled.div`
  overflow: hidden;

  * {
    white-space: nowrap;
    transform: translateX(100%);
    animation: ${RoofAnimation} 30s linear infinite;
  }
`;
