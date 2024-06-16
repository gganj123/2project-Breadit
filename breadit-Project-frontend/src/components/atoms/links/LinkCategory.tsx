import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonBox = styled.div`
  display: flex;
  background-color: #fff;
  align-items: center;
  height: 6.6rem;
  padding-left: 2rem;
  margin-top: 3rem;
  position: relative;
  font-size: 2rem;
  font-weight: 500;
  box-shadow: 0px 0px 3rem rgb(242 242 242);
  border-radius: 1rem;
  overflow: hidden;

  &:hover span {
    background-color: #f9cadb;
  }
`;

const ButtonArrow = styled.span`
  display: inline-block;
  height: 100%;
  width: 6.6rem;
  background-color: #fbdde8;
  position: absolute;
  top: 0;
  right: 0;
  transition: background-color 0.25s;

  &::after {
    content: '';
    width: 1.2rem;
    height: 1.2rem;
    border-top: solid 2px #575757;
    border-right: solid 2px #575757;
    position: absolute;
    top: 40%;
    left: 36%;
    transform: rotate(45deg);
  }
`;

const ButtonCategory: React.FC<{ go: string; categoryName: string }> = ({
  go,
  categoryName,
}) => {
  return (
    <Link to={go}>
      <ButtonBox>
        {categoryName}
        <ButtonArrow />
      </ButtonBox>
    </Link>
  );
};

export default ButtonCategory;
