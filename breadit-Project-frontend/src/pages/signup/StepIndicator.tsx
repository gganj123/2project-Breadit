/**
 * 회원가입 단계 표시기
 */
import { FC } from 'react';
import styled from 'styled-components';

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
`;

const StepNumber = styled.div<{ active: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active === 'true' ? '#ffc14b' : '#D9D9D9'}; // active 따라 배경색 변경
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  z-index: 1;
`;

const StepLabel = styled.div`
  margin-top: 8px;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  max-width: 40rem;
  margin: 0px auto 4rem;
`;

const Connector = styled.div`
  position: absolute;
  left: 5%;
  top: 15px;
  width: calc(90% - 10px);
  height: 1px;
  background-color: #ccc;
  z-index: 0;
`;

const StepIndicator: FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <StepsContainer>
      <Connector />
      {['약관동의', '정보입력', '가입완료'].map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;

        return (
          <StepContainer key={label}>
            <StepNumber active={isActive.toString()}>{stepNumber}</StepNumber>
            <StepLabel>{label}</StepLabel>
          </StepContainer>
        );
      })}
    </StepsContainer>
  );
};

export default StepIndicator;
