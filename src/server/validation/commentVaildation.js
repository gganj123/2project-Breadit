const Joi = require("joi");

module.exports = {
  //댓글 생성 유효성
  validateCommentCreateReq: (data) => {
    const commentCreateReqSchema = Joi.object({
      nickname: Joi.string()
        .min(2)
        .required()
        .error(() => new Error("닉네임을 적어주세요.")),
      profile: Joi.string(),
      user_id: Joi.string()
        .required()
        .error(() => new Error("사용자 ID는 필수입니다.")),
      post_id: Joi.string()
        .required()
        .error(() => new Error("포스트 ID는 필수입니다.")),
      content: Joi.string()
        .required()
        .error(() => new Error("코멘트 내용은 필수입니다.")),
      canPost: Joi.boolean().default(true),
    });

    const { error, value } = commentCreateReqSchema.validate(data);

    if (!error) {
      const result = {};
      Object.keys(value).forEach((key) => {
        const words = key.split(/(?=[A-Z])/);
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toLowerCase() + words[i].slice(1);
        }
        const resultWord = words.join("_");
        result[resultWord] = value[key];
      });
      return { error, value: result };
    }

    return { error, value: null };
  },

  //댓글 수정 유효성
  validateCommentUpdateReq: (data) => {
    const commentUpdateReqSchema = Joi.object({
      nickname: Joi.string()
        .min(2)
        .error(() => new Error("닉네임을 적어주세요.")),
      profile: Joi.string(),
      content: Joi.string()
        .min(1)
        .error(() => new Error("코멘트 내용을 적어주세요.")),
      canPost: Joi.boolean().default(true),
    });

    const { error, value } = commentUpdateReqSchema.validate(data);

    if (!error) {
      const result = {};
      Object.keys(value).forEach((key) => {
        const words = key.split(/(?=[A-Z])/);
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toLowerCase() + words[i].slice(1);
        }
        const resultWord = words.join("_");
        result[resultWord] = value[key];
      });
      return { error, value: result };
    }

    return { error, value: null };
  },
};
