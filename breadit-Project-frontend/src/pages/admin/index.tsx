import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCategory from './AdminCategory';
import AdminGuide from './AdminGuide';
import ButtonDeafult from '../../components/atoms/buttons/ButtonDefault';
import LinkDefault from '../../components/atoms/links/LinkDefault';
import BigCard from '../../components/BigCard/BigCard';
import {
  useGetMagazineListApi,
  useDeleteMagazineByCheckApi,
} from '../../hooks/useMagazineApi';
import { useAuth } from '../login/AuthContext';

import './admin.css';
import Pagination from '../../components/Pagination';

const AdminMagazine = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (!loading && user.user_role !== 'editor') {
      navigate('/');
    } else if (!userId) {
      navigate('/');
    }
  }, [user, loading]);

  const { data: magazineList, refetch } = useGetMagazineListApi();
  const { mutate: deleteList } = useDeleteMagazineByCheckApi();
  const [checkList, setCheckList] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const deleteMagazineCheckList = (idList: string[]) => {
    deleteList(idList);
    setCheckList([]);
    refetch();
    setCurrentPage(1);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (checkList.length > 0) {
      if (confirm('선택한 항목을 삭제하시겠습니까?')) {
        deleteMagazineCheckList(checkList);
        setCheckList([]);
      }
    } else {
      alert('선택된 항목이 없습니다.');
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    magazineList?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <section className="admin_area">
      <AdminCategory />
      <section className="admin_cont">
        <AdminGuide />
        <div className="main_title flex_default">
          <h4>매거진 관리</h4>
          <div className="buttons">
            <LinkDefault text={'매거진 발행'} go={'/magazines/edit'} />
            <ButtonDeafult
              text={'선택 삭제'}
              clickevent={() => handleDeleteSelected()}
            />
          </div>
        </div>
        <div className="admin_magazine_list">
          {currentItems &&
            currentItems.map((magazine) => {
              return (
                <BigCard
                  data={magazine}
                  key={magazine._id}
                  userInfo={false}
                  admin={true}
                  handleCheckboxChange={handleCheckboxChange}
                  isChecked={checkList.includes(magazine._id)}
                  go={'magazines'}
                />
              );
            })}
        </div>
        <div style={{ margin: '20px 0 0', paddingBottom: '6rem' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(
              magazineList && magazineList.length
                ? magazineList.length / itemsPerPage
                : 1
            )}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </section>
  );
};

export default AdminMagazine;
