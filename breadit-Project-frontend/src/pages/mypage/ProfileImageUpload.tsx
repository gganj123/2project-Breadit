/**
 * 회원 프로필 사진 업로드 컴포넌트 ( 동그라미 + 펜 아이콘 )
 * 프로필 사진 업로드, 삭제 기능
 */
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaPen } from 'react-icons/fa';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { useAuth } from '../login/AuthContext';

type ProfileImageUploadProps = {
  src: string;
  onImageUpload?: (imageUrl: string) => void; // 수정: imageUrl로 변경
  onRemoveImage?: () => void;
  showEditIcon?: boolean;
};

const ProfileImageContainer = styled.div<{ src: string }>`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: url(${(props) => props.src}) center / cover no-repeat;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const OptionsOverlay = styled.div`
  display: none;
  position: absolute;
  bottom: -45px;
  right: -130px;
  border-radius: 4px;
  border: 1px solid #575757;
  padding: 5px;
  flex-direction: column;
  background: #fff;
`;

const OptionButton = styled.button`
  font-size: 14px;
  color: #575757;
  background: #fff;
  padding: 2px 2px;
  cursor: pointer;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

const IconContainer = styled.div`
  color: #fff;
  position: absolute;
  bottom: 5px;
  right: 3px;
  background: #575757;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const EditIcon = styled(FaPen)`
  font-size: 13px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  src,
  onImageUpload,
  onRemoveImage,
  showEditIcon = true,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, updateUserInfo } = useAuth();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const imageUrl = await uploadImageToS3(file);
      if (imageUrl) {
        onImageUpload?.(imageUrl); // 수정: imageUrl 전달
        setShowOptions(false);
        setImageSrc(imageUrl); // 수정: 이미지 업로드 후 상태 업데이트
      }
    }
  };

  const uploadImageToS3 = async (file: File) => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: `${import.meta.env.VITE_ACCESS_KEY}`,
        secretAccessKey: `${import.meta.env.VITE_SECRET_ACCESS_KEY}`,
      },
      region: `${import.meta.env.VITE_REGION}`,
    });

    const params = {
      Bucket: 'elice-breadit-project',
      Key: `new/${file.name}`,
      Body: file,
      ACL: 'public-read',
    };

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: 'elice-breadit-project',
          Key: `new/${file.name}`,
          Body: file,
          ACL: 'public-read',
        })
      ); // 이미지 업로드

      // 이미지 URL 구성
      const imageUrl = `https://elice-breadit-project.s3.ap-northeast-2.amazonaws.com/${params.Key}`;

      return imageUrl; // 이미지 URL 반환
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleRemoveImage = () => {
    onRemoveImage?.();
    setShowOptions(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <ProfileImageWrapper>
      <ProfileImageContainer src={imageSrc}>
        {showEditIcon && (
          <IconContainer onClick={handleEditClick}>
            <EditIcon />
          </IconContainer>
        )}

        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
        />
      </ProfileImageContainer>
      <OptionsOverlay style={{ display: showOptions ? 'flex' : 'none' }}>
        <OptionButton onClick={() => fileInputRef.current?.click()}>
          Upload a photo ...
        </OptionButton>
        <OptionButton onClick={handleRemoveImage}>Remove photo</OptionButton>
      </OptionsOverlay>
    </ProfileImageWrapper>
  );
};

export default ProfileImageUpload;
