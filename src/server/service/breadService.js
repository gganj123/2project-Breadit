const Bread = require('../db/repository/breadRepository'); // Bread 모델을 가져옵니다.
const Review = require('../db/repository/reviewRepository'); // reviewSchema가 정의된 파일 경로
// 브레드 생성 서비스
async function createBread(breadData) {
  try {
    const newBread = await Bread.create(breadData);
    return newBread;
  } catch (error) {
    throw new Error('브레드 생성 중 오류가 발생했습니다.');
  }
}

// 모든 브레드 가져오기 서비스
async function getAllBreads() {
  try {
    const breads = await Bread.find();
    return breads;
  } catch (error) {
    throw new Error('브레드 조회 중 오류가 발생했습니다.');
  }
}

// 특정 브레드 가져오기 서비스
async function getBreadById(breadId) {
  try {
    const bread = await Bread.findById(breadId);
    return bread;
  } catch (error) {
    throw new Error('브레드 조회 중 오류가 발생했습니다.');
  }
}

// 브레드 업데이트 서비스
async function updateBread(breadId, newData) {
  try {
    const updatedBread = await Bread.findByIdAndUpdate(breadId, newData, { new: true });
    return updatedBread;
  } catch (error) {
    throw new Error('브레드 업데이트 중 오류가 발생했습니다.');
  }
}

// 브레드 삭제 서비스
async function deleteBread(breadId) {
  try {
    const deletedBread = await Bread.findByIdAndDelete(breadId);
    return deletedBread;
  } catch (error) {
    throw new Error('브레드 삭제 중 오류가 발생했습니다.');
  }
}

async function getCommentsForBread(breadId) {
  try {
    // 빵을 찾습니다.
    const bread = await Bread.findById(breadId);
    if (!bread) {
      throw new Error('빵을 찾을 수 없습니다.');
    }

    // 빵의 ID를 이용하여 해당 빵에 연결된 리뷰의 댓글들을 가져옵니다.
    const reviews = await Review.find({ post_id: breadId });

    return reviews;
  } catch (error) {
    throw new Error('리뷰 댓글 조회 중 오류가 발생했습니다.');
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