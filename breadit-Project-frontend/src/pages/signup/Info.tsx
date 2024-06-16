/**
 * 회원가입 입력 페이지 ( 두번째 )
 */
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import Button from '../../components/atoms/buttons/Button';
import StepIndicator from './StepIndicator';
import { SignUpInput } from '../../components/atoms/input/SignUpInput';

const PageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 120px auto;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 2.6rem;
  color: #333;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 2.6rem;
  box-shadow: 0px 0px 1rem rgb(242 242 242);
  border-radius: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
`;

const ValidationMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #e44444;
  margin-bottom: 5px;
`;
const Timer = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #575757;
`;
const SignUpInfoPage: React.FC = () => {
  const apiUrl = `${import.meta.env.VITE_BACKEND_SERVER}`;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    verifyCode: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  const [validation, setValidation] = useState({
    passwordsMatch: true,
  });

  const { verifyCode, password, confirmPassword } = formData;
  const { passwordsMatch } = validation;

  // 에러 메시지 상태
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [verifyMessage, setVerifyMessage] = useState('');

  // 유효성 검사 상태
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [verifyCodeValid, setVerifyCodeValid] = useState(false);

  // 인증 관련 상태
  const [serverVerifyCode, setServerVerifyCode] = useState(''); // 서버에서 준 인증코드
  const [timeLeft, setTimeLeft] = useState(0); // 인증번호 유효 시간
  const [timerCleanup, setTimerCleanup] = useState<() => void>();
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 보내준 것
  const [verifyCodeConfirmed, setVerifyCodeConfirmed] = useState(false);
  const isFormFilled = Object.values(formData).every((value) => value);
  const isSignUpEnabled =
    emailValid &&
    passwordValid &&
    passwordsMatch &&
    nicknameValid &&
    verifyCodeValid &&
    isFormFilled;
  useEffect(() => {
    const canAccess = localStorage.getItem('canAccess');
    if (canAccess === 'true') {
      localStorage.removeItem('canAccess'); // 접근 후 권한 삭제
    } else {
      navigate('/signup'); // 권한 없으면 리디렉션
    }
  }, [navigate]);
  // 이메일 유효성 검사
  const validateEmail = async (email: string) => {
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      setEmailValid(false);
      return false;
    }

    const emailRegex =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? '' : '올바른 이메일 형식을 입력해주세요.');
    setEmailValid(isValid);
    return isValid;
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      setPasswordValid(false);
      return false;
    }
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자리 이상이어야 합니다.');
      setPasswordValid(false);
      return false;
    }
    if (password.length > 20) {
      setPasswordError('비밀번호는 최대 20자까지 가능합니다.');
      setPasswordValid(false);
      return false;
    }
    if (/\s/.test(password)) {
      setPasswordError('비밀번호에 공백을 포함할 수 없습니다.');
      setPasswordValid(false);
      return false;
    }
    setPasswordError('');
    setPasswordValid(true);
    return true;
  };

  // 닉네임 유효성 검사
  const validateNickname = (nickname: string) => {
    if (!nickname) {
      setNicknameError('닉네임을 입력해주세요.');
      setNicknameValid(false);
      return false;
    }
    if (nickname.length < 2) {
      setNicknameError('닉네임은 2자 이상이어야 합니다.');
      setNicknameValid(false);
      return false;
    }
    if (nickname.length > 8) {
      setNicknameError('닉네임은 최대 8자까지 가능합니다.');
      setNicknameValid(false);
      return false;
    }
    if (/\s/.test(nickname)) {
      setNicknameError('닉네임에 공백을 포함할 수 없습니다.');

      return false;
    }
    setNicknameError('');
    setNicknameValid(true);
    return true;
  };

  // Input 값 관리 / 유효성 에러 메세지
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'email') {
      await validateEmail(value);
    }
    if (name === 'password') {
      const isPasswordValid = validatePassword(value);
      setValidation((prevValidation) => ({
        ...prevValidation,
        passwordsMatch: isPasswordValid && value === formData.confirmPassword,
      }));
    }
    if (name === 'confirmPassword') {
      setValidation((prevValidation) => ({
        ...prevValidation,
        passwordsMatch: value === formData.password,
      }));
    }
    if (name === 'nickname') {
      validateNickname(value);
    }
  };

  // 회원가입 입력 값 제출
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!passwordsMatch) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (
      !validatePassword(formData.password) ||
      !validateNickname(formData.nickname)
    ) {
      return;
    }

    try {
      // 회원가입 요청
      await axios.post(`${apiUrl}/users`, {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        confirmPassword: formData.confirmPassword,
        profile:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      });

      console.log('회원가입 성공:');
      handleSignUpSuccess(formData.nickname);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        '회원가입 중 오류가 발생했습니다.';
      if (axiosError.response?.status === 409) {
        setEmailError(errorMessage);
      } else {
        console.error(errorMessage);
      }
    }
  };
  // 회원가입 최종 완료
  const handleSignUpSuccess = (nickname: string) => {
    localStorage.setItem('canAccess', 'true'); // 접근 권한 저장
    navigate('/signup/info/complete', { state: { nickname } });
  };

  // 이메일 인증번호 요청
  const checkEmail = async () => {
    if (!formData.email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/users/verify-email`, {
        email: formData.email,
      });
      console.log(response.data);
      window.confirm('인증 코드 발송 완료');
      const { verificationCode, expirationTimestamp } = response.data;
      setIsCodeSent(true);
      setServerVerifyCode(verificationCode);
      console.log('인증번호:', verificationCode);
      const expirationTime = new Date(expirationTimestamp).getTime();
      const currentTime = new Date().getTime();
      const duration = expirationTime - currentTime;
      setTimeLeft(Math.floor(duration / 1000));

      startTimer(duration);
      console.log('인증 코드 발송 완료.');
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        '회원가입 중 오류가 발생했습니다.';
      if (axiosError.response?.status === 409) {
        setEmailError(errorMessage);
      } else {
        console.error(errorMessage);
      }
    }
  };
  // 타이머
  const startTimer = (duration: number) => {
    let time = duration;
    const timerInterval = setInterval(() => {
      time -= 1000;
      setTimeLeft(Math.floor(time / 1000));

      if (time <= 0) {
        clearInterval(timerInterval);
        setIsCodeSent(false); // 인증 코드 전송 상태를 false로 설정
        setVerifyMessage('인증 코드가 만료되었습니다.'); // 만료 메시지 표시
        setServerVerifyCode(''); // 서버에서 발급한 코드를 지워서 더 이상 사용하지 않도록 함
      }
    }, 1000);

    setTimerCleanup(() => () => clearInterval(timerInterval));
  };
  // 이메일 인증번호 확인
  const checkVerifyCode = () => {
    if (formData.verifyCode == serverVerifyCode) {
      setVerifyMessage('인증되었습니다.');
      setVerifyCodeValid(true);
      setVerifyCodeConfirmed(true);
      setTimeLeft(0);
      if (timerCleanup) timerCleanup();
      return true;
    } else if (!serverVerifyCode || !formData.email) {
      setVerifyMessage('인증번호를 발송해주세요.');
      setVerifyCodeValid(false);
      return false;
    } else {
      setVerifyMessage('인증번호가 다릅니다');
      setVerifyCodeValid(false);
      return false;
    }
  };

  return (
    <PageContainer>
      <Title>회원 정보 입력</Title>
      <StepIndicator currentStep={2} />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <SignUpInput
              type="email"
              label="이메일"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={verifyCodeConfirmed}
            />

            <Button
              type="button"
              text="인증번호 발송"
              backcolor={
                verifyCodeConfirmed
                  ? '#B7B7B7'
                  : emailValid
                    ? '#575757'
                    : '#B7B7B7'
              }
              textcolor="#FFFFFF"
              width="120px"
              height="46px"
              onClick={checkEmail}
              disabled={!emailValid || verifyCodeConfirmed} // 인증번호가 확인된 후에는 인증번호 발송 버튼을 비활성화
            />
          </InputGroup>
          {emailError && <ValidationMessage>{emailError}</ValidationMessage>}
          <InputGroup>
            <SignUpInput
              type="text"
              label="인증번호"
              name="verifyCode"
              value={verifyCode}
              onChange={handleInputChange}
              disabled={verifyCodeConfirmed} // 인증번호 확인 후에는 입력 필드 비활성화
            />

            <Button
              type="button"
              text="확인"
              backcolor={
                verifyCodeConfirmed
                  ? '#B7B7B7'
                  : formData.verifyCode
                    ? '#575757'
                    : '#B7B7B7'
              }
              textcolor="#FFFFFF"
              width="120px"
              height="46px"
              onClick={!verifyCodeConfirmed ? checkVerifyCode : undefined} // 인증번호가 확인되지 않았을 때만 함수 실행
              disabled={!formData.verifyCode || verifyCodeConfirmed} // 입력 필드가 비어있거나 인증번호가 확인된 경우 비활성화
            />
          </InputGroup>
          {isCodeSent && !verifyCodeConfirmed && (
            <Timer>인증번호 유효 시간: {timeLeft}초</Timer>
          )}
          <ValidationMessage
            style={{
              color:
                verifyMessage === '인증되었습니다.' ? '#3AC673' : '#e44444',
            }}
          >
            {verifyMessage}
          </ValidationMessage>
          <SignUpInput
            type="password"
            label="비밀번호"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            icon={
              passwordValid ? (
                <IoCheckmarkCircleSharp size={24} color="#5FD08D" />
              ) : null
            }
          />
          {passwordError && (
            <ValidationMessage>{passwordError}</ValidationMessage>
          )}
          <SignUpInput
            type="password"
            label="비밀번호 확인"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            icon={
              passwordsMatch && password && confirmPassword ? (
                <IoCheckmarkCircleSharp size={24} color="#5FD08D" />
              ) : null
            }
          />
          {!passwordsMatch && (
            <ValidationMessage>비밀번호가 일치하지 않습니다.</ValidationMessage>
          )}
          <SignUpInput
            type="text"
            label="닉네임"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
          />
          {nicknameError && (
            <ValidationMessage>{nicknameError}</ValidationMessage>
          )}
          <Button
            type="submit"
            text="회원가입"
            backcolor={isSignUpEnabled ? '#575757' : '#B7B7B7'}
            textcolor="#FFFFFF"
            width="100%"
            height="60px"
            disabled={!isSignUpEnabled}
          />
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

export default SignUpInfoPage;
