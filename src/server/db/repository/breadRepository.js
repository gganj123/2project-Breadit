const mongoose = require("mongoose");
const breadSchema = require("../schema/bread");

const Bread = mongoose.model("Bread", breadSchema);

module.exports = Bread;
