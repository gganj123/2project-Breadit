import { Link } from 'react-router-dom';
const instagramImgList = [
  {
    src: './instagram/instagram1.svg',
    go: 'C5aYFEkLCxh/?igsh=bXd0cDhpMXJmMXZ4',
  },
  {
    src: './instagram/instagram2.svg',
    go: 'C5aYxSVr8po/?igsh=eXltd3p1ajBpdzE1',
  },
  {
    src: './instagram/instagram3.svg',
    go: 'C5aYy41rVOE/?igsh=MXF3NjFuajZ3a2c4MQ==',
  },
  {
    src: './instagram/instagram4.svg',
    go: 'C5aY2HDLu77/?igsh=MWxmNmxvN3J1MXg4Zg==',
  },
  {
    src: './instagram/instagram5.svg',
    go: 'C5aY3tYrHhC/?igsh=MWxyOXltaHFrdWNrcQ==',
  },
  {
    src: './instagram/instagram6.svg',
    go: 'C5aY6Y0LKTN/?igsh=YTI2YTQ1bWM5bmNk',
  },
  {
    src: './instagram/instagram7.svg',
    go: 'C5aZmKML89A/?igsh=aDlxcHJlb3Ayc3Bp',
  },
  {
    src: './instagram/instagram8.svg',
    go: 'C5aZ5d1LEr-/?igsh=MmV3bnRrZWR3cm02',
  },
  {
    src: './instagram/instagram9.svg',
    go: 'C5aaJAsrveB/?igsh=bDh3aXk2N25sb2lp',
  },
  {
    src: './instagram/instagram10.svg',
    go: 'C5aaJtrrQlX/?igsh=cXdoZmN4enM4emhn',
  },
];

const MainInstagramImg = () => {
  return (
    <ul className="instagram_list">
      {instagramImgList.map((img, index) => {
        return (
          <li className="img_box" key={index}>
            <Link to={`https://www.instagram.com/p/${img.go}`} target="_blank">
              <img src={img.src} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MainInstagramImg;
