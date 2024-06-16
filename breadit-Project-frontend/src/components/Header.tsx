import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/login/AuthContext';
import Logo from '/Logo.svg';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  const { user, logout, loading } = useAuth();

  return (
    <header className={`flex_default header ${scrollPosition > 60 && 'fixed'}`}>
      <nav className="main_nav">
        <ul>
          <li>
            <Link to="/magazines">매거진</Link>
          </li>
          <li>
            <Link to="/map">지도</Link>
          </li>
          <li>
            <Link to="/community">커뮤니티</Link>
          </li>
        </ul>
      </nav>
      <h1 id="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </h1>
      <ul className="user_ul">
        {user ? (
          <>
            {user.user_role === 'editor' ? (
              <>
                <li>
                  <Link to="/admin">에디터 관리</Link>
                </li>

                <li>
                  <Link to="/mypage">
                    {loading
                      ? 'Loading...'
                      : `${user.nickname}님` || 'No Nickname'}
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/mypage">
                  {loading
                    ? 'Loading...'
                    : `${user.nickname}님` || 'No Nickname'}
                </Link>
              </li>
            )}
            <li>
              <button onClick={logout}>로그아웃</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
