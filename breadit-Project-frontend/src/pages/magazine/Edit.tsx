import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EditorComponent } from '../../components/QuillEditor';
import styled from 'styled-components';

const MagazineEdit = () => {
  const [postData, setPostData] = useState(null); // 전달받은 게시물 데이터를 저장할 상태

  const location = useLocation();
  const { state } = location; // 이전 페이지에서 전달된 state 객체

  // 컴포넌트가 마운트될 때 게시물 데이터를 받아옴
  useEffect(() => {
    if (state && state.data) {
      setPostData(state.data);
    }
  }, [state]);

  return (
    <>
      <div className="magazine detail">
        <h2 className="oleo-script-bold">Magazine</h2>
        <EditorComponent selectedCategory={'magazine'} postData={postData} />
      </div>
    </>
  );
};

export default MagazineEdit;
