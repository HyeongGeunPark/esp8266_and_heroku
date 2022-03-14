const mongoose = require('mongoose');

// mongoDB Schema 정의
const TempHumidSchema = new mongoose.Schema({
  saveDate:{
    type: Date,
    default: Date.now
  },
  name: String,
  temp: Number,
  humid: Number
});
// mongoDB 모델 생성
const TempHumid = mongoose.model("TempHumidData", TempHumidSchema);

module.exports = TempHumid;