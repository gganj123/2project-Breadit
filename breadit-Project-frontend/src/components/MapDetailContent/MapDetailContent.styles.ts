import styled from 'styled-components';

export const MapDetailStyled = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  width: 40rem;

  .thumbnail_box {
    height: 30rem;
    overflow: hidden;
    background-size: cover !important;
  }

  .thumbnail {
    width: 100%;
  }

  .store_name {
    padding: 2.6rem 2rem 2.4rem;
    text-align: center;
    border-bottom: solid 1px #eee;
  }

  .store_name h4 {
    padding-top: 1rem;
    font-size: 2.6rem;
  }

  .store_info {
    padding: 3rem 2rem 2rem;
  }

  .store_info img {
    width: 1.8rem;
  }

  h5 {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.6rem;
    margin: 2.4rem 0 0;
  }

  .inner_text {
    margin-top: 1rem;
    padding-left: 3rem;
    display: flex;
    gap: 1rem;
  }

  .subway_area .inner_text span {
    width: 7rem;
  }

  .web_link {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    word-break: break-all;
    overflow: hidden;
    line-height: 1.4;
    color: #6d87d3;
  }
`;

export const DetailInfoStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.4rem;
`;
