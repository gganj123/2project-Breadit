/**
 * 로그인 페이지
 */
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '/Logo.svg';
import Button from '../../components/atoms/buttons/Button';
import { Input } from '../../components/atoms/input/Input';
import { useAuth } from './AuthContext';
import { BsChatFill } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
`;
const LogoImage = styled.img`
  width: 250px;
  height: 70px;
  margin-bottom: 40px;
`;
const SignUpTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #616161;
  margin: 2rem;
  &:hover {
    color: #575757;
    font-weight: 400;
  }
`;
const SocialLoginTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin: 30px 20px 10px;
`;

const RedirectUri = `${import.meta.env.VITE_REDIRECT_URI}`;
const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${RedirectUri}&response_type=code&scope=email profile`;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${RedirectUri}&response_type=code`;
const naverURL = `https:nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&state=false&redirect_uri=${RedirectUri}`;

const Login: FC = () => {
  //const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const googlehandleLogin = () => {
    window.location.href = googleURL;
  };
  const kakaohandleLogin = () => {
    window.location.href = kakaoURL;
  };
  const naverhandleLogin = () => {
    window.location.href = naverURL;
  };

  return (
    <>
      <Container>
        <LogoImage src={Logo} className="logo" alt="Vite logo" />
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="이메일"
            name="email"
            value={form.email}
            onChange={handleFormChange}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            name="password"
            value={form.password}
            onChange={handleFormChange}
          />
          <Button
            type="submit"
            text="로그인"
            backcolor="#FFCB46"
            textcolor="#000000"
            icon={true}
          />
        </form>
        <Link to="/signup">
          <SignUpTitle>회원가입</SignUpTitle>
        </Link>
        <SocialLoginTitle>SNS 계정으로 로그인</SocialLoginTitle>
        {/* <Button
          type="button"
          text="구글 로그인"
          backcolor="#F2F2F2"
          textcolor="#000000"
          onClick={() => googlehandleLogin()}
          icon={<FcGoogle />}
        />*/}
        <Button
          type="button"
          text="카카오 로그인"
          backcolor="#FEE500"
          textcolor="#000000"
          onClick={() => kakaohandleLogin()}
          icon={<BsChatFill />}
        />
        {/*<Button
          type="button"
          text="네이버 로그인"
          backcolor="#03C75A"
          textcolor="#FFFFFF"
          onClick={() => naverhandleLogin()}
          icon={<SiNaver />}
        />*/}
      </Container>
    </>
  );
};

export default Login;
