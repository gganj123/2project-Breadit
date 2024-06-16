const Joi = require("joi");

module.exports = {
  validateReviewCreateReq: (data) => {
    const reviewCreateReqSchema = Joi.object({
      nickname: Joi.string()
        .min(1)
        .required()
        .error(() => new Error("닉네임을 적어주세요.")),
      profile: Joi.string(),
      user_id: Joi.string()
        .required()
        .error(() => new Error("사용자 ID는 필수입니다.")),
      post_id: Joi.string()
        .required()
        .error(() => new Error("포스트 ID는 필수입니다.")),
      rating: Joi.number()
        .required()
        .min(1)
        .max(5)
        .error(() => new Error("평점은 1부터 5까지의 숫자여야 합니다.")),
      content: Joi.string()
        .required()
        .error(() => new Error("리뷰 내용은 필수입니다.")),
      can_post: Joi.boolean().default(true),
    });

    const { error, value } = reviewCreateReqSchema.validate(data);

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

  validateReviewUpdateReq: (data) => {
    const reviewUpdateReqSchema = Joi.object({
      nickname: Joi.string()
        .min(1)
        .error(() => new Error("닉네임을 적어주세요.")),
      profile: Joi.string(),
      rating: Joi.number()
        .min(1)
        .max(5)
        .error(() => new Error("평점은 1부터 5까지의 숫자여야 합니다.")),
      content: Joi.string()
        .min(1)
        .error(() => new Error("리뷰 내용은 필수입니다.")),
      can_post: Joi.boolean(),
    }).min(1); // 적어도 하나의 필드가 존재해야 합니다.

    const { error, value } = reviewUpdateReqSchema.validate(data);

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
