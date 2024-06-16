import { Link } from 'react-router-dom';
import Figma from '/icons/figma_icon.svg';
import Gitlab from '/icons/gitlab_icon.svg';
import Notion from '/icons/notion_icon.svg';

const Footer = () => {
  const preparingAlert = () => {
    alert('준비중 입니다.');
  };

  return (
    <footer className="main_cont">
      <div className="footer_info">
        <h3 className="font_oleo footer_logo">Breadit</h3>
        <h5>Team 03</h5>
        <p>김도현, 김연서, 김은지, 라수빈, 정영준, 한지은 </p>
        <p>Elice, Software track 08</p>
        <p>서울 성동구 아차산로17길 48 성수낙낙 2층 엘리스랩 성수점</p>
        <p>copyright.2024 Elice Lab All rights reserved.</p>
      </div>
      <ul className="flex_default footer_icon">
        <li>
          <Link
            to="https://www.figma.com/file/Mdf4ewn8zhXbhaEbCNZWav/Team03_Design?type=design&node-id=0%3A1&mode=dev&t=WTB6mmCVKZdOWZ0y-1"
            target="_blank"
          >
            <img src={Figma} />
          </Link>
        </li>
        <li>
          <Link
            to="https://kdt-gitlab.elice.io/sw_track/class_08/web_project_ii/team03"
            target="_blank"
          >
            <img src={Gitlab} />
          </Link>
        </li>
        <li onClick={preparingAlert}>
          <img src={Notion} />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
