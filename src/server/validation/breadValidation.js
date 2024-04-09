const Joi = require("joi");

module.exports = {
  // BREAD 생성 유효성 검사 함수
  validateBreadCreateReq: (data) => {
    const breadCreateReqSchema = Joi.object({
      name: Joi.string()
        .required()
        .error(() => new Error("빵집 이름은 필수입니다.")),
      address: Joi.string()
        .required()
        .error(() => new Error("주소는 필수입니다.")),
      phone: Joi.number()
        .required()
        .error(() => new Error("전화번호는 필수입니다.")),
      location: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
      business_hours: Joi.object({
        monday: Joi.string(),
        tuesday: Joi.string(),
        wednesday: Joi.string(),
        thursday: Joi.string(),
        friday: Joi.string(),
        saturday: Joi.string(),
        sunday: Joi.string(),
      }),
      menu: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().required(),
        })
      ),
    });

    const { error, value } = breadCreateReqSchema.validate(data);

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
  // BREAD 수정 유효성 검사 함수
  validateBreadUpdateReq: (data) => {
    const breadUpdateReqSchema = Joi.object({
      name: Joi.string(),
      address: Joi.string(),
      phone: Joi.number(),
      location: Joi.object({
        latitude: Joi.number(),
        longitude: Joi.number(),
      }),
      business_hours: Joi.object({
        monday: Joi.string(),
        tuesday: Joi.string(),
        wednesday: Joi.string(),
        thursday: Joi.string(),
        friday: Joi.string(),
        saturday: Joi.string(),
        sunday: Joi.string(),
      }),
      menu: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          price: Joi.number(),
        })
      ),
    });

    const { error, value } = breadUpdateReqSchema.validate(data);

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
