const Joi = require("joi");
//회원가입 유효성 검사
module.exports = {
  userCreateReq: (data) => {
    const userCreateReqSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } }) // 이메일 형식 유효성 검사
        .required()
        .error(() => new Error("올바른 이메일 주소를 입력하세요.")), // 에러 메시지
      nickname: Joi.string()
        .min(2)
        .required()
        .error(
          () => new Error("닉네임은 필수이며 최소 2자 이상이어야 합니다.")
        ),
      password: Joi.string()
        .min(6)
        .required()
        .error(
          () => new Error("비밀번호는 필수이며 최소 6자 이상이어야 합니다.")
        ),
    });

    const { error, value } = userCreateReqSchema.validate(data);

    if (!error) {
      const result = {};
      Object.keys(value).forEach((key) => {
        const words = key.split("_");
        for (let i = 1; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
        const resultWord = words.join("");
        result[resultWord] = value[key];
      });
      return { error, value: result };
    }

    return { error, value: null };
  },
};

//개인정보 유효성 검사

module.exports = {
  updateUserInfoReq: (data) => {
    const updateUserInfoSchema = Joi.object({
      nickname: Joi.string()
        .min(1)
        .max(100)
        .error(
          () => new Error("닉네임은 필수이며 최소 1자, 최대 100자여야 합니다.")
        ),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .error(() => new Error("올바른 이메일 주소를 입력하세요.")),
      password: Joi.string()
        .min(6)
        .error(() => new Error("비밀번호는 최소 6자 이상이어야 합니다.")),
    });

    const { error, value } = updateUserInfoSchema.validate(data);

    if (!error) {
      const result = {};
      Object.keys(value).forEach((key) => {
        const words = key.split("_");
        for (let i = 1; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
        const resultWord = words.join("");
        result[resultWord] = value[key];
      });
      return { error, value: result };
    }

    return { error, value: null };
  },
};
