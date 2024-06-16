import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EditorComponent } from '../../components/QuillEditor';
import SelectBox from '../../components/atoms/selectbox/Selectbox';

export default function EditPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [postData, setPostData] = useState(null); // 전달받은 게시물 데이터를 저장할 상태

  const location = useLocation();
  const { state } = location; // 이전 페이지에서 전달된 state 객체

  const CATEGORY_OPTIONS = [
    { value: 'bakery', name: '베이커리 소개' },
    { value: 'recipe', name: '레시피 소개' },
  ];

  // 카테고리 선택 핸들러
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  // 컴포넌트가 마운트될 때 게시물 데이터를 받아옴
  useEffect(() => {
    if (state && state.data) {
      setPostData(state.data);
    }
  }, [state]);

  return (
    <>
      <div className="detail">
        <div className="community">
          <h2 className="oleo-script-bold community_title">Community</h2>
          {state == null && (
            <SelectBox
              options={CATEGORY_OPTIONS}
              onChange={handleCategoryChange}
              value={selectedCategory}
              className="custom-select-box"
            />
          )}
          <EditorComponent
            selectedCategory={selectedCategory || 'default'}
            postData={postData}
          />
        </div>
      </div>
    </>
  );
}
