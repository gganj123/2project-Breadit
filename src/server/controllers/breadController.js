const breadService = require('../service/breadService');

// 브레드 생성 컨트롤러
// async function createBread(req, res, next) {
//     try {
//         const breadData = req.body;
//         const newBread = await breadService.createBread(breadData);
//     } catch (error) {
//         // res.status(500).json({ message: error.message });
//       next(error)
//     }
// }
// 브레드 생성 컨트롤러
async function createBread(req, res, next) {
    try {
        const breadData = req.body;
        const newBread = await breadService.createBread(breadData);
        res.status(201).json(newBread); // 브레드가 성공적으로 생성되었음을 클라이언트에게 알림
    } catch (error) {
        // 오류가 발생하면 next(error)를 호출하여 미들웨어 체인 상의 다음 오류 처리 미들웨어로 전달합니다.
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
        next(error)
    }
}

// 특정 브레드 가져오기 컨트롤러
async function getBreadById(req, res, next) {
    try {
        const breadId = req.params.id;
        const bread = await breadService.getBreadById(breadId);
        if (!bread) {
            res.status(404).json({ message: '브레드를 찾을 수 없습니다.' });
            return;
        }
        res.json(bread);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error)
    }
}

// 브레드 업데이트 컨트롤러
async function updateBread(req, res, next) {
    try {
        const breadId = req.params.id;
        const newData = req.body;
        const updatedBread = await breadService.updateBread(breadId, newData);
        res.json(updatedBread);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error)
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
        next(error)
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
    next(error)
  }
}

module.exports = {
    createBread,
    getAllBreads,
    getBreadById,
    updateBread,
    deleteBread,
    getCommentsForBread
};