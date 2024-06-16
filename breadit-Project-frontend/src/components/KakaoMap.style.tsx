import styled from 'styled-components';

export const MapContainer = styled.div`
  position: absolute;
  background: #fff;
  height: 100%;
  top: 9.2rem;
  left: 0;
  display: flex;

  .map_inner {
    width: 34rem;
  }

  #pagination {
    text-align: center;
    font-size: 1.8rem;
    margin-top: 2rem;
    a {
      cursor: pointer;
      color: #000;
      + a {
        margin-left: 15px;
      }
    }
  }
`;

export const MapWrapper = styled.div<{ $expanded: boolean }>`
  width: ${(props) => (props.$expanded ? 'calc(100% - 34rem)' : '100%')};
  margin-left: auto;
  height: 100vh;
`;

export const MapList = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    width: 100%;
    height: 11rem;
    border-bottom: solid 1px #eee;

    &:hover {
      background: #eff7ff;
    }

    &.active {
      background: #eff7ff;
    }
  }
`;

export const MapListItem = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 20px 0;
  border-radius: 20px;
  p {
    margin-top: 10px;
  }
  .title {
    font-size: 2rem;
    font-weight: 600;
    color: #000;
    margin-top: 0;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .address {
    margin: 10px 0;
    font-size: 1.6rem;
    color: dimgray;
  }
  .tel {
    font-size: 1.4rem;
    height: 2rem;
    display: flex;
    gap: 0.4rem;
    align-items: center;
  }

  .tel img {
    width: 14px;
  }
`;

export const MapSearchBox = styled.div`
  position: absolute;
  top: 12rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: #fff;
  width: 40%;
  height: 4.4rem;
  display: flex;

  input {
    width: 90%;
    padding: 10px;
    cursor: default;
  }
  button {
    width: 4rem;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
  }
`;

export const FindNearMap = styled.div`
  padding: 10px 20px;
  background: #575757;
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
`;

export const FindNearBakery = styled.div`
  padding: 10px 20px;
  background: #eee;
  width: 130px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  background: #ffcb46;
  color: #fff;
`;

export const SlidePin = styled.div<{ $expanded: boolean }>`
  width: 3rem;
  height: 6rem;
  position: absolute;
  top: 50%;
  left: ${(props) => (props.$expanded ? '100%' : '0')};
  transform: translateY(-50%);
  background: #ffcb46;
  z-index: 100;
  box-shadow: 0.6rem 0.6rem 0.4rem rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &::before {
    content: '';
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 40%;
    left: ${(props) => (props.$expanded ? '40%' : '20%')};
    border-top: solid 1px #575757;
    border-right: solid 1px #575757;
    transform: ${(props) =>
      props.$expanded ? 'rotate(225deg)' : 'rotate(45deg)'};
  }
`;

export const MapDetailStyle = styled.section`
  height: 100%;
  background-color: #fff;
  z-index: 12;
  box-shadow: 1rem 1rem 1.2rem rgba(0, 0, 0, 0.1);
  border-left: solid 1px #ddd;

  .closed_detail_btn {
    position: absolute;
    top: 10%;
    left: 100%;
    background-color: #fff;
    width: 4rem;
    height: 4rem;
    box-shadow: 1rem 1rem 1.2rem rgba(0, 0, 0, 0.1);
  }

  .closed_detail_btn::before,
  .closed_detail_btn::after {
    content: '';
    display: inline-block;
    width: 2rem;
    height: 2px;
    background-color: #666;
    position: absolute;
    left: 1rem;
    transform: rotate(45deg);
  }

  .closed_detail_btn::after {
    transform: rotate(135deg);
  }
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;
