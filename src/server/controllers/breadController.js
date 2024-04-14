const breadService = require("../service/breadService");
const breadValidation = require("../validation/breadValidation");
const {
  validateMagazinePostCreateReq,
} = require("../validation/breadValidation");

// 브레드 생성 컨트롤러
async function createBread(req, res, next) {
  try {
    const validationResult = breadValidation.validateBreadCreateReq(req.body);
    if (validationResult.error) {
      throw validationResult.error;
    }

    const newComment = await breadService.createBread(validationResult.value);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
}

// 모든 브레드 가져오기 컨트롤러
async function getAllBreads(req, res, next) {
  try {
    const breads = await breadService.getAllBreads();
    res.json(breads);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

// 특정 브레드 가져오기 컨트롤러
async function getBreadById(req, res, next) {
  try {
    const breadId = req.params.id;
    const bread = await breadService.getBreadById(breadId);
    if (!bread) {
      const error = new Error("브레드를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    res.json(bread);
  } catch (error) {
    next(error);
  }
}

//브레드 업데이트 컨트롤러
async function updateBread(req, res, next) {
  try {
    const validationResult = breadValidation.validateBreadUpdateReq(req.body);
    if (validationResult.error) {
      throw validationResult.error;
    }

    const breadId = req.params.id;
    const updatedBread = await breadService.updateBread(
      breadId,
      validationResult.value
    );
    res.json(updatedBread);
  } catch (error) {
    next(error);
  }
}

// 브레드 삭제 컨트롤러
async function deleteBread(req, res, next) {
  try {
    const breadId = req.params.id;
    const deletedBread = await breadService.deleteBread(breadId);
    res.json(deletedBread);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

async function getCommentsForBread(req, res, next) {
  // 요청에서 빵 ID를 가져옵니다.
  try {
    const breadId = req.params.id;
    const reviews = await breadService.getCommentsForBread(breadId); // 주어진 빵 ID에 대한 리뷰 댓글을 가져옵니다.
    res.status(200).json(reviews); // 리뷰 댓글을 JSON 형식으로 응답합니다.
  } catch (error) {
    // 오류가 발생한 경우 오류 메시지를 응답합니다.
    // res.status(500).json({ error: error.message });
    next(error);
  }
}

module.exports = {
  createBread,
  getAllBreads,
  getBreadById,
  updateBread,
  deleteBread,
  getCommentsForBread,
};
