import { useRef, useState, useMemo, useEffect } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useCreateMagazineApi,
  useEditMagazineApi,
} from '../hooks/useMagazineApi';
import { useCreatePostApi, useEditPostApi } from '../hooks/usePostApi';
import { useCreateRecipeApi, useEditRecipeApi } from '../hooks/useRecipeApi';
import { useAuth } from '../pages/login/AuthContext';
import NoImg from '/no_img.svg';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const EditContextBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  button,
  a {
    display: block;
    text-align: center;
    width: 110px;
    height: 44px;
    padding: 12px 0;
    font-size: 1.8rem;
    background-color: #575757;
    color: #fff;
    border-radius: 0.6rem;
  }
`;

const EditTitle = styled.input`
  width: 100%;
  height: 4.4rem;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #dedede;
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

const ContentCountStyled = styled.p`
  margin: 1rem 0;
  text-align: right;
  color: #666;
`;

type EditorProps = {
  selectedCategory?: string;
  postData: any;
};

export const EditorComponent = ({
  selectedCategory,
  postData,
}: EditorProps) => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState(postData?.content || '');
  const [title, setTitle] = useState(postData?.title || '');
  const [images, setImages] = useState(postData?.images || []);
  const [thumbnail, setThumbnail] = useState(postData?.thumbnail || '');

  const navigate = useNavigate();
  const isEditMode = !!postData;
  const saveButtonText = isEditMode ? '수정하기' : '작성하기';

  const goBack = () => {
    navigate(-1);
  };

  const s3 = new S3Client({
    credentials: {
      accessKeyId: `${import.meta.env.VITE_ACCESS_KEY}`,
      secretAccessKey: `${import.meta.env.VITE_SECRET_ACCESS_KEY}`,
    },
    region: `${import.meta.env.VITE_REGION}`,
  });

  const handleImageUpload = async (file: File) => {
    const params = {
      Bucket: 'elice-breadit-project',
      Key: `newcontent/${file.name}`,
      Body: file,
      ACL: 'public-read',
    };

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: 'elice-breadit-project',
          Key: `newcontent/${file.name}`,
          Body: file,
          ACL: 'public-read',
        })
      ); // 이미지 업로드

      // 이미지 URL 구성
      const imageUrl = `https://elice-breadit-project.s3.ap-northeast-2.amazonaws.com/${params.Key}`;

      return imageUrl; // 이미지 URL 반환
      console.log(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;

    // 이미지 파일이 존재하는지 확인
    if (files.length === 0) {
      return;
    }

    // 기존 이미지가 있을 경우, 기존 썸네일 이미지를 교체
    if (thumbnail) {
      const imageUrl = await handleImageUpload(files[0]);
      if (imageUrl) {
        setThumbnail(imageUrl);
      }
    } else {
      // 기존 이미지가 없을 경우, 새로운 이미지로 썸네일 설정
      const imageUrl = await handleImageUpload(files[0]);
      if (imageUrl) {
        setThumbnail((prevImages: string) => [...prevImages, imageUrl]);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // thumbnail 상태를 사용하도록 수정
  const thumbnailPreview = thumbnail && (
    <div className="thumb_img">
      <h1>썸네일 이미지</h1>
      <img
        src={thumbnail}
        alt="썸네일 이미지"
        style={{
          maxWidth: '100px',
          maxHeight: '100px',
          marginRight: '10px',
          marginBottom: '10px',
        }}
      />
    </div>
  );

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        const promises = [];
        for (let i = 0; i < file.length; i++) {
          const imageUrl = await handleImageUpload(file[i]);
          if (imageUrl) {
            promises.push(imageUrl);
          }
        }

        Promise.all(promises)
          .then((urls) => {
            setImages((prevImages: string[]) => [...prevImages, ...urls]);

            const range = QuillRef.current?.getEditor().getSelection()?.index;
            if (range !== null && range !== undefined) {
              const quill = QuillRef.current?.getEditor();
              urls.forEach((url) => {
                const imageUrlString = JSON.stringify(url);
                quill?.clipboard.dangerouslyPasteHTML(
                  range,
                  `<img src=${imageUrlString.slice(1, -1)} alt="이미지 태그가 삽입됩니다." />`
                );
              });
            }
          })
          .catch((error) => {
            console.error('Error uploading images:', error);
          });
      }
    };
  };

  const formats = [
    'font',
    'size',
    'header',
    'color',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'background',
    'float',
    'height',
    'width',
  ];

  const modules = useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          ['image', 'video'],
        ],
        ImageResize: {
          modules: ['Resize'],
        },
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (postData) {
      setContents(postData.content || '');
      setTitle(postData.title || '');
      setImages(postData.images || []);
      setThumbnail(postData.thumbnail || '');
    }
  }, [postData]);

  // hook 변경
  const { user } = useAuth();
  const { mutate: createMagazine } = useCreateMagazineApi();
  const { mutate: createPost } = useCreatePostApi();
  const { mutate: createRecipe } = useCreateRecipeApi();
  const { mutate: editMagazine } = useEditMagazineApi();
  const { mutate: editPost } = useEditPostApi();
  const { mutate: editRecipe } = useEditRecipeApi();
  const { state } = useLocation();

  console.log(title.length);

  const handlecreateData = () => {
    if (!title) {
      toast('제목을 입력해주세요.');
    } else if (!contents) {
      toast('내용을 입력해주세요.');
    } else if (title.length > 30) {
      toast('제목은 최대 30자 입니다.');
    } else if (contents.length > 1000) {
      toast('내용은 최대 1000자 입니다.');
    } else {
      if (user !== null) {
        const thumbnailUrl = thumbnail.length > 0 ? thumbnail[0] : '';
        const imagesJSON = JSON.stringify(images);

        const createData = {
          user_id: user._id || '',
          thumbnail: thumbnailUrl || NoImg,
          title: title,
          nickname: user.nickname || 'no nickname',
          profile: user.profile || '',
          content: contents,
          images: imagesJSON,
        };

        const editData = {
          user_id: user._id || '',
          thumbnail: thumbnail || NoImg,
          title: title,
          nickname: user.nickname || 'no nickname',
          content: contents,
          images: imagesJSON,
        };

        if (postData !== null) {
          if (state.editCategory === 'magazine') {
            editMagazine({ editData: editData, targetId: postData.id });
          } else if (state.editCategory === 'default') {
            editPost({ editData: editData, targetId: postData.id });
          } else if (state.editCategory === 'recipe') {
            editRecipe({ editData: editData, targetId: postData.id });
          }
        } else {
          if (selectedCategory === 'magazine') {
            createMagazine(createData);
          } else if (selectedCategory === 'default') {
            createPost(createData);
          } else if (selectedCategory === 'recipe') {
            createRecipe(createData);
          }
        }
      }
      navigate(-1);
    }
  };

  return (
    <>
      <EditTitle
        className="edit_title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요."
      />
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        formats={formats}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
      <ContentCountStyled>{`${contents.length}/1000`}</ContentCountStyled>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: '100%',
          height: '200px',
          border: '2px dashed #ccc',
          borderRadius: '5px',
          textAlign: 'center',
          lineHeight: '200px',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
      >
        드래그 앤 드롭하여 이미지 업로드
      </div>
      {thumbnailPreview}
      <EditContextBtn>
        <button onClick={handlecreateData}>{saveButtonText}</button>
        <button onClick={goBack}>취소</button>
      </EditContextBtn>
      <ToastContainer />
    </>
  );
};
