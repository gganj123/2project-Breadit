import React from 'react';
import { Link } from 'react-router-dom';
import Noimg from '/no_img.svg';

type Props = {
  to: string;
  images: string;
  titles: string;
  sub: string;
  rest: string;
};

const MyPageList: React.FC<Props> = ({ to, images, titles, sub, rest }) => {
  return (
    <li>
      <div className="list_img_wrapper">
        <Link to={`${to}`}>
          <img src={images || Noimg} alt={titles} />
        </Link>
      </div>
      <div className="subcategory">
        <p>{titles || ''}</p>
        <p>{sub || ''}</p>
        <p className="category_item">{rest || ''}</p>
      </div>
    </li>
  );
};

export default MyPageList;
