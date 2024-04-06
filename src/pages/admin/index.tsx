import AdminCategory from './AdminCategory';
import AdminGuide from './AdminGuide';
import ButtonDeafult from '../../components/atoms/buttons/ButtonDefault';
import AdminTable from './AdminTable';

import './admin.css';

const AdminMain: React.FC = () => {
  let theadTitle: string[] = ['No', '닉네임', '이메일', '관리'];
  let tbodyContent: { nickname: string; email: string }[] = [
    { nickname: '메론빵 거북이', email: 'turtle_001@gmail.com' },
    { nickname: '식빵맨', email: 'toast@gmail.com' },
    { nickname: '포도파이', email: 'grape@gmail.com' },
  ];

  return (
    <>
      <section className="admin_area">
        <AdminCategory />
        <section className="admin_cont">
          <AdminGuide />
          <div className="main_title flex_default">
            <h4>사용자 관리</h4>
            <ButtonDeafult text={'선택 삭제'} />
          </div>
          <AdminTable theadTitle={theadTitle} tbodyContent={tbodyContent} />
        </section>
      </section>
    </>
  );
};

export default AdminMain;
