const AdminGuide = () => {
  return (
    <div className="admin_guide">
      <h4>관리자 가이드</h4>
      <ul>
        <li>
          사용자 계정 및 사용자가 작성한 게시글은 관리자 페이지에서 수정이
          불가하며 목적성에 어긋난 컨텐츠에 한해 삭제 처리 가능합니다.
        </li>
        <li>
          매거진 게시에 관한 권한은 관리자에게만 부여되며 매거진 발행 및 수정,
          삭제 모두 가능합니다.
        </li>
      </ul>
    </div>
  );
};

export default AdminGuide;
