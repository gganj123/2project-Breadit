import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/atoms/buttons/Button';
import Checkbox from '../../components/atoms/checkbox/Checkbox';
import StepIndicator from './StepIndicator';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';

type AgreementProps = {
  title: string;
  content: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const PageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 120px auto;
  padding: 20px;
`;

const AgreementTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-left: 10px;
`;

const AgreementContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #fff;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 1.2rem;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 2.6rem;
  color: #333;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
`;

const ContentContainer = styled.div<{ open: boolean }>`
  border-top: solid 1px #eee;
  font-size: 15px;
  line-height: 1.4;
  padding: ${({ open }) => (open ? '1.4rem' : '0 1.4rem')};
  max-height: ${({ open }) => (open ? '1000px' : '0')};
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  transition: all 0.2s;
  white-space: pre-line;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const WarningMessage = styled.div`
  color: #e44444;
  font-size: 14px;
  text-align: left;
  margin-top: 5px;
`;

const Agreement: FC<AgreementProps> = ({
  title,
  content,
  checked,
  onCheckedChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AgreementContainer>
      <TitleContainer onClick={() => setIsOpen(!isOpen)}>
        <CheckboxLabel>
          <Checkbox checked={checked} onChange={onCheckedChange} />
          <AgreementTitle>{title}</AgreementTitle>
        </CheckboxLabel>
        {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </TitleContainer>
      <ContentContainer open={isOpen}>{content}</ContentContainer>
    </AgreementContainer>
  );
};

const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handlePrevClick = () => {
    navigate('/login');
  };

  const handleNextClick = () => {
    if (!termsChecked || !privacyChecked) {
      setShowWarning(true);
    } else {
      localStorage.setItem('canAccess', 'true');
      navigate('/signup/info');
      setShowWarning(false);
    }
  };

  const handleAllCheckedChange = (checked: boolean) => {
    setAllChecked(checked);
    setTermsChecked(checked);
    setPrivacyChecked(checked);
    setShowWarning(false);
  };

  const handleIndividualCheckedChange = (
    checked: boolean,
    type: 'terms' | 'privacy'
  ) => {
    if (type === 'terms') {
      setTermsChecked(checked);
    } else {
      setPrivacyChecked(checked);
    }

    const allChecked =
      (type === 'terms' ? checked : termsChecked) &&
      (type === 'privacy' ? checked : privacyChecked);
    setAllChecked(allChecked);

    setShowWarning(false);
  };

  return (
    <PageContainer>
      <Title>회원가입</Title>
      <StepIndicator currentStep={1} />
      <Agreement
        title="전체 동의하기"
        content="전체 동의에는 필수 및 선택 정보에 대한 동의가 포함되어 있으며, 개별적으로 동의를 선택 하실 수 있습니다. 선택 항목에 대한 동의를 거부하시는 경우에도 서비스 이용이 가능합니다."
        checked={allChecked}
        onCheckedChange={handleAllCheckedChange}
      />
      <Agreement
        title="[필수] 이용약관"
        content="[ Breadit 이용 약관 ] 이 약관은 Breadit 주식회사(이하 “회사”)가 운영하는 사이버몰에서 제공하는 서비스와 이를 이용하는 회원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다."
        checked={termsChecked}
        onCheckedChange={(checked) =>
          handleIndividualCheckedChange(checked, 'terms')
        }
      />
      <Agreement
        title="[필수] 개인정보처리방침"
        content="Breadit은 회원가입, 민원 등 고객상담 처리, 본인확인 등을 목적으로 개인정보를 수집 및 이용합니다."
        checked={privacyChecked}
        onCheckedChange={(checked) =>
          handleIndividualCheckedChange(checked, 'privacy')
        }
      />
      {showWarning && (
        <WarningMessage>
          <RiErrorWarningFill /> 필수 항목에 모두 동의해주세요.
        </WarningMessage>
      )}
      <ButtonsContainer>
        <Button
          type="button"
          text="이전"
          backcolor="#575757"
          textcolor="#FFFFFF"
          onClick={handlePrevClick}
        />
        <Button
          type="button"
          text="다음"
          backcolor="#575757"
          textcolor="#FFFFFF"
          onClick={handleNextClick}
        />
      </ButtonsContainer>
    </PageContainer>
  );
};

export default SignUpPage;
