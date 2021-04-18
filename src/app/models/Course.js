const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema({
  _id: { type: Number, },
  name: {type: String ,required: true, maxlength: 255},
  description: {type: String , maxlength: 600},
  image: {type: String , maxlength: 255},
  videoId: { type: String },
  slug: { type: String, slug: 'name', unique: true },
}, {
  _id: false,
  timestamps: true, //tu dong them truong creatAt va updateAt
});

//add plugin
mongoose.plugin(slug);
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete,{
  deletedAt : true, 
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);