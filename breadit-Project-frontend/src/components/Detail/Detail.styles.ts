import styled from 'styled-components';

export const DetailTopStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2rem;

  .user_info {
    gap: 2rem;
  }

  .profile {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background: #eee;
    overflow: hidden;
    border: solid 1px #eee;
  }

  .profile img {
    width: 100%;
  }

  .user_info p {
    font-size: 1.8rem;
  }

  .date {
    display: inline-block;
    padding-left: 1.4rem;
    margin-left: 1.4rem;
    color: #888;
    border-left: solid 1px #b6b6b6;
  }
`;

export const DetailContentStyled = styled.div`
  margin: 3rem 0 4rem;
  min-height: 26vh;
  font-size: 1.8rem;
  line-height: 1.6;

  * {
    line-height: 1.6;
  }
  img {
    max-width: 100%;
  }
`;
