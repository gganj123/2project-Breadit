import { useRef, useState, useMemo } from 'react';
import AWS from 'aws-sdk'; // AWS SDK를 불러옵니다.

//이렇게 라이브러리를 불러와서 사용하면 됩니다
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const EditorComponent = () => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');

  // AWS S3 설정
  const s3 = new AWS.S3({
    accessKeyId: `${import.meta.env.VITE_ACCESS_KEY}`,
    secretAccessKey: `${import.meta.env.VITE_SECRET_ACCESS_KEY}`,
    region: `${import.meta.env.VITE_REGION}`,
  });

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement('input');
    let url = '';

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        const params = {
          Bucket: 'elice-breadit-project',
          Key: `images/${file[0].name}`, // S3에 저장될 경로 및 파일 이름
          Body: file[0],
          ACL: 'public-read', // 이미지를 공개 읽기로 설정
        };

        // S3에 이미지 업로드
        s3.upload(params, (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          url = data.Location; // 업로드된 이미지의 URL

          // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드
          // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            const quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
            );
          }
        });
      }
    };
  };

  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
  const modules = useMemo(
    () => ({
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
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </>
  );
};
