import styled from 'styled-components';

type ButtonProps = {
  text: string;
  backgroundcolor?: string;
  color?: string;
  clickevent?: () => void;
};

type ButtonStyleProps = {
  backgroundcolor?: string;
  color?: string;
};

const ButtonStyle = styled.button<ButtonStyleProps>`
  height: 4.4rem;
  background-color: ${(props) => props.backgroundcolor || '#575757'};
  padding: 0 2.4rem;
  font-size: 1.8rem;
  color: ${(props) => props.color || '#fff'};
  line-height: 1.5;
  border-radius: 0.6rem;
`;

const ButtonDeafult = ({
  text,
  backgroundcolor,
  color,
  clickevent,
}: ButtonProps) => {
  return (
    <ButtonStyle
      backgroundcolor={backgroundcolor}
      color={color}
      onClick={clickevent}
    >
      {text}
    </ButtonStyle>
  );
};

export default ButtonDeafult;
