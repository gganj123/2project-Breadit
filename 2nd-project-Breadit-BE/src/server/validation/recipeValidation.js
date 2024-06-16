const Joi = require("joi");

module.exports = {
  validateRecipeCreateReq: (data) => {
    const recipeCreateReqSchema = Joi.object({
      user_id: Joi.string()
        .required()
        .error(() => new Error("사용자 ID는 필수입니다.")),
      nickname: Joi.string()
        .required()
        .error(() => new Error("닉네임을 적어주세요.")),
      profile: Joi.string(),
      thumbnail: Joi.string().error(
        () => new Error("섬네일을 올바르게 입력해주세요.")
      ),
      title: Joi.string()
        .required()
        .error(() => new Error("제목을 작성해주세요.")),
      content: Joi.string()
        .required()
        .error(() => new Error("내용을 작성해주세요.")),
      images: Joi.string().allow("").optional(), // 이미지는 선택적으로 허용
    });

    const { error, value } = recipeCreateReqSchema.validate(data);

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
  // 레시피 수정 유효성
  validateRecipeUpdateReq: (data) => {
    const RecipeUpdateReqSchema = Joi.object({
      user_id: Joi.string()
        .required()
        .error(() => new Error("사용자 ID는 필수입니다.")),
      nickname: Joi.string()
        .min(2)
        .error(() => new Error("닉네임을 적어주세요.")),
      profile: Joi.string(),
      thumbnail: Joi.string(),

      title: Joi.string()
        .min(1)
        .error(() => new Error("제목을 작성해주세요.")),
      content: Joi.string()
        .required()
        .error(() => new Error("내용을 작성해주세요.")),
      images: Joi.string().error(
        () => new Error("이미지를 올바르게 입력해주세요.")
      ),
      instagram_info: Joi.string(),
    });

    const { error, value } = RecipeUpdateReqSchema.validate(data);

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
