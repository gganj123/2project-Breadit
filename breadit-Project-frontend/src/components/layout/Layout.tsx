import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Footer from '../Footer';
import Header from '../Header';

const GlobalStyle = createGlobalStyle`
  * {box-sizing: border-box;}
  html, body, h1, h2, h3, h4, h5, h6,
  p, div, em, sup, sub, code, hr, strong, span, q, blockquote,
  header, footer, aside, nav, article, section, figure, main,
  img, a, table, tr, td, th, thead, tbody, tfoot,
  ul, ol, li, dl, dt, dd, address,
  form, fieldset, legend, input, button, select, option, textarea {
    margin: 0; padding: 0; line-height: 1.0; outline:none; font-family: "Noto Sans KR", sans-serif;

  }
  h1, h2, h3, h4, h5, h6 {font-weight:700;}
  ul, ol, li {list-style: none;}
  table, td, th, tr {border-collapse: collapse;}
  a {color: #333; text-decoration: none;}
  textarea {resize: none;}
  fieldset {border: 0;}
  button {cursor:pointer; background: none; border: 0; outline:none;}
  html,
  body {    
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-size: 62.5%;
    color:#575757;
  } 

  html {
    overflow-x:hidden;
  }

  html::-webkit-scrollbar {
    background-color: rgba(255, 255, 255, 0.8);
    width: 1.2rem;
  }

  html::-webkit-scrollbar-thumb {
    background-color: #575757;
  }
  
  body {
    background-color:#fdfbf7;
    font-size:1.6rem;
    padding-top:9.2rem;
  }
  
  ::selection {
    background-color: #ffcb46;
    color: #fff;
  }

  .font_oleo {
    font-family: "Oleo Script", system-ui;
  }

  /* header */
  .header {
    width: 100%;
    height: 9.2rem;
    padding: 1.4rem 5vw 0;
    box-sizing: border-box;
    background-color: #fdfbf7;
    position: fixed;
    top:0;
    box-shadow: 0px 0px 1.2rem rgb(233 227 222);
    transition:all 0.25s;
    z-index: 999;
  }

  .header.fixed {
    height: 6.6rem;
    padding-top:0;
  }


  .header ul {
    display: flex;
    gap: 2.6rem;
    align-items: center;
  }

  .header ul li a, .header ul li button {
    font-size: 1.8rem;
    color: #222;
    font-weight: 500;
    transition:font-size 0.25s;
  }


  .fixed ul li a, .fixed ul li button {
    font-size:1.6rem;
  }

  #logo {
    position: absolute;
    top: 54%;
    left: 50%;
    width:16rem;
    transform: translate(-50%, -50%);
    transition:all 0.25s;
  }

  #logo img {width:100%}

  .fixed #logo {
    top:52%;
    width:14.6rem
  }


  .box_arrow_btn a {
    display: flex;
    height: 6.6rem;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    box-sizing: border-box;
    font-size: 2rem;
    color: #222;
    font-weight: 400;
  }

  /* footer */
  footer {
    background-color: #3d3d3d;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .footer_logo {
    font-size: 4rem;
    color: #fff;
  }

  .footer_info h5 {
    font-size: 1.4rem;
    color: #fff;
    margin: 2rem 0 1rem;
  }

  .footer_info p {
    font-size: 1.6rem;
    color: #bbb;
    line-height: 1.6;
  }

  .footer_info p:nth-of-type(2) {
    margin-bottom: 1rem;
  }

  .footer_icon {
    gap: 2rem;
  }

  .main_cont {
    padding:8rem 5vw;
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }

`;

const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
