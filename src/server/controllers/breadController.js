const breadService = require('../services/breadService');

// 브레드 생성 컨트롤러
async function createBread(req, res) {
    try {
        const breadData = req.body;
        const newBread = await breadService.createBread(breadData);
        res.status(201).json(newBread);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 모든 브레드 가져오기 컨트롤러
async function getAllBreads(req, res) {
    try {
        const breads = await breadService.getAllBreads();
        res.json(breads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 특정 브레드 가져오기 컨트롤러
async function getBreadById(req, res) {
    try {
        const breadId = req.params.id;
        const bread = await breadService.getBreadById(breadId);
        if (!bread) {
            res.status(404).json({ message: '브레드를 찾을 수 없습니다.' });
            return;
        }
        res.json(bread);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 브레드 업데이트 컨트롤러
async function updateBread(req, res) {
    try {
        const breadId = req.params.id;
        const newData = req.body;
        const updatedBread = await breadService.updateBread(breadId, newData);
        res.json(updatedBread);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 브레드 삭제 컨트롤러
async function deleteBread(req, res) {
    try {
        const breadId = req.params.id;
        const deletedBread = await breadService.deleteBread(breadId);
        res.json(deletedBread);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createBread,
    getAllBreads,
    getBreadById,
    updateBread,
    deleteBread
};