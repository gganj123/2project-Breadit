const Bread = require("../db/repository/breadRepository"); // Bread 모델을 가져옵니다.
// 브레드 생성 서비스
async function createBread(breadData) {
  const newBread = await Bread.create(breadData);
  if (!newBread) {
    const error = new Error("브레드 생성 중 오류가 발생했습니다.");
    error.status = 500;
    throw error;
  }
  return newBread;
}

// 모든 브레드 가져오기 서비스
async function getAllBreads() {
  try {
    const breads = await Bread.find();
    if (!breads || breads.length === 0) {
      const error = new Error("빵집을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return breads;
  } catch (error) {
    throw error;
  }
}

// 특정 브레드 가져오기 서비스
async function getBreadById(breadId) {
  try {
    const bread = await Bread.findById(breadId);
    if (!bread) {
      const error = new Error("breadId에 해당하는 빵집이 없습니다.");
      error.status = 404;
      throw error;
    }
    return bread;
  } catch (error) {
    throw error;
  }
}

// 브레드 업데이트 서비스
async function updateBread(breadId, newData) {
  const updatedBread = await Bread.findByIdAndUpdate(breadId, newData, {
    new: true,
  });
  if (!updatedBread) {
    const error = new Error("브레드 업데이트 중 오류가 발생했습니다.");
    error.status = 404;
    throw error;
  }
  return updatedBread;
}

// 브레드 삭제 서비스
async function deleteBread(breadId) {
  const deletedBread = await Bread.findByIdAndDelete(breadId);
  if (!deletedBread) {
    const error = new Error("breadId에 해당하는 브레드를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }
  return deletedBread;
}

module.exports = {
  createBread,
  getAllBreads,
  getBreadById,
  updateBread,
  deleteBread,
};
