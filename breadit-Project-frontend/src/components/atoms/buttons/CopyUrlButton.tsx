import ShareIcon from '/share_icon.svg';

const CopyUrlButton = () => {
  const copyurl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('URL이 복사되었습니다.');
  };

  return (
    <button onClick={copyurl}>
      <img src={ShareIcon} alt="링크 공유하기" />
    </button>
  );
};

export default CopyUrlButton;
