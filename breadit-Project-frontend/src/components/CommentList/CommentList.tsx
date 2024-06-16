import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonDefault from '../atoms/buttons/ButtonDefault';
import Comment from './Comment';
import {
  useCommentByPostIdApi,
  useDeleteCommentByIdApi,
  useCreateCommentApi,
} from '../../hooks/useCommentApi';
import { CommentsContStyled } from './Comment.styles';
import NoProfile from '/no_profile.svg';
import { useAuth } from '../../pages/login/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const Comments = ({ postId }: { postId: string }) => {
  const { data: commentList } = useCommentByPostIdApi(postId || '');
  const { mutate: deleteMutate } = useDeleteCommentByIdApi();
  const { mutate: createMutate } = useCreateCommentApi();

  const [commentTextArea, setCommentTextArea] = useState('');

  const resetComment = () => {
    setCommentTextArea(''); // 취소버튼 textArea 초기화
  };

  const deleteCommentId = (id: string) => {
    deleteMutate(id);
  };

  const userId = localStorage.getItem('id');

  const { user } = useAuth();

  const createComment = () => {
    if (commentTextArea.length > 200) {
      toast('댓글은 200자가 최대입니다.');
    } else {
      if (user !== null) {
        const commentData = {
          nickname: user.nickname || 'no nickname',
          profile: user.profile || NoProfile,
          user_id: user._id || '',
          post_id: postId,
          content: commentTextArea,
        };

        createMutate(commentData);
        setCommentTextArea('');
      }
    }
  };

  return (
    <CommentsContStyled>
      {user && userId ? (
        <div className="comment_input">
          <div className="my_info">
            <div className="img_box">
              <img src={user && user.profile ? user.profile : NoProfile} />
            </div>
            <span>{user.nickname || 'no nickname'}</span>
          </div>
          <div className="text_area">
            <textarea
              name="comment"
              placeholder="댓글을 입력하세요"
              onChange={(e) => setCommentTextArea(e.target.value)}
              value={commentTextArea}
            />
            <p className="comment_count">{`${commentTextArea.length}/200`}</p>
          </div>
          <div className="buttons">
            <ButtonDefault
              text={'취소'}
              backgroundcolor={'#d9d9d9'}
              color={'#575757'}
              clickevent={resetComment}
            />
            <ButtonDefault text={'등록'} clickevent={createComment} />
          </div>
        </div>
      ) : (
        <div className="comment_input">
          <div className="my_info">
            <div className="img_box">
              <img src={NoProfile} />
            </div>
            <span>
              <Link to="/login">로그인 후 댓글을 남겨주세요.</Link>
            </span>
          </div>
        </div>
      )}

      <div className="comment_list">
        {commentList &&
          commentList.length > 0 &&
          commentList.map((comment) => {
            return (
              <Comment
                key={comment._id}
                data={comment}
                deleteEvent={deleteCommentId}
              />
            );
          })}
        {commentList && commentList.length == 0 && (
          <p className="no_content">댓글이 없습니다.</p>
        )}
      </div>
      <ToastContainer />
    </CommentsContStyled>
  );
};

export default Comments;
