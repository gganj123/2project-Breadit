const breadSchema = require("../schema/bread");
const BreadShop = mongoose.model('BreadShop', breadSchema);


async function getBreadShopById(breadShopId) {
  try {
    const breadShop = await BreadShop.findOne({ Id: breadShopId });
    if (!breadShop) {
      throw new Error('빵집을 찾을 수 없습니다.');
    }
    return breadShop;
  } catch (error) {
    throw new Error('Error fetching bread shop data: ' + error.message);
  }
}

module.exports = { BreadShop, getBreadShopById };