const mongoose = require('mongoose');
const schema = mongoose. Schema({
coursename:String,
duration:String,
rating:Number,
comments:String
});
const FeedbackData = mongoose.model('feedback',schema);
module.exports = FeedbackData;