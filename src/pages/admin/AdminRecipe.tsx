import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminCategory from './AdminCategory';
import AdminGuide from './AdminGuide';
import ButtonDeafult from '../../components/atoms/buttons/ButtonDefault';
import AdminTable from './AdminTable';

import './admin.css';

const AdminMain = () => {
  let theadTitle: string[] = ['No', '닉네임', '제목', '관리'];

  const [recipeList, setRecipeList] = useState([]);

  let apiUrl = `${import.meta.env.VITE_BACKEND_SERVER}`;

  const getRecipesAPI = async () => {
    try {
      const response = await axios.get(`${apiUrl}/recipes`);
      setRecipeList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipesAPI();
  }, []);

  return (
    <>
      <section className="admin_area">
        <AdminCategory />
        <section className="admin_cont">
          <AdminGuide />
          <div className="main_title flex_default">
            <h4>레시피 관리</h4>
            <ButtonDeafult text={'선택 삭제'} />
          </div>
          <AdminTable theadTitle={theadTitle} data={recipeList} />
        </section>
      </section>
    </>
  );
};

export default AdminMain;
