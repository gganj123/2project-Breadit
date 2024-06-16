import ButtonCategory from '../../components/atoms/links/LinkCategory';

const AdminCategory = () => {
  const categories = [
    { go: '/admin', categoryName: '매거진 관리' },
    { go: '/admin-post', categoryName: '추천글 관리' },
    { go: '/admin-recipe', categoryName: '레시피 관리' },
  ];

  return (
    <div className="admin_category">
      <h3 className="font_oleo">Admin</h3>
      <ul>
        {categories.map((category, index) => {
          return (
            <li key={index}>
              <ButtonCategory
                go={category.go}
                categoryName={category.categoryName}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminCategory;
