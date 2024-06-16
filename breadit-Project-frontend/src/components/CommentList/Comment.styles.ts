import styled from 'styled-components';

export const CommentsContStyled = styled.section`
  .comment_input {
    margin-top: 3rem;
  }

  .my_info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .my_info .img_box {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .my_info .img_box img {
    width: 100%;
  }

  .text_area {
    width: 100%;
  }

  textarea {
    width: 100%;
    height: 13rem;
    font-size: 1.6rem;
    padding: 1.6rem;
    border: solid 1px #ddd;
  }

  .comment_count {
    text-align: right;
    color: #666;
    margin-top: 1rem;
  }

  .buttons {
    margin-top: 2rem;
    justify-content: flex-end;
  }

  .comment_list {
    margin-top: 2rem;
    border-top: solid 1px #ddd;
  }

  .no_content {
    text-align: center;
    line-height: 20rem;
    border-bottom: solid 1px #ddd;
    color: #888;
  }
`;

export const CommentItemStyled = styled.div`
  padding: 2.4rem 0;
  border-bottom: solid 1px #ddd;

  .user_info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.4rem;
  }

  .user_info .profile {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    border: solid 1px #eee;
  }

  .user_info .profile img {
    width: 100%;
  }

  .user_name {
    display: flex;
  }

  .user_name .nickname {
    font-size: 1.6rem;
  }

  .user_name .date {
    color: #888;
    padding-left: 1.4rem;
    margin-left: 1.4rem;
    border-left: solid 1px #b6b6b6;
  }

  .comment {
    display: flex;
    justify-content: space-between;
    min-height: 4rem;
  }

  .comment .text_area {
    max-width: 80rem;
  }

  .comment_content {
    max-width: 60rem;
    line-height: 1.4;
  }
`;
