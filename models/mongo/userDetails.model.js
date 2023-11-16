
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const experienceSchema=new Schema({
    title:{type:String,required:true},
    company:{type:String,required:true},
    location:{type:String,required:true},
    from:{type:Date,required:true},
    to:{type:Date},
    current:{type:Boolean,default:false},
    description:{type:String}
});

const educationSchema=new Schema({
    institute:{type:String,required:true},
    degree:{type:String,required:true},
    fieldOfStudy:{type:String,required:true},
    from:{type:Date,required:true},
    to:{type:Date},
    current:{type:Boolean,default:false},
    description:{type:String}
});                                                                                             


const profileSchema = new Schema({
  user_id: { type: String, required: true },
  username: { type: String, default: '' },
  fullName: { type: String, default: '' },
  phone_number: { type: String, default: '' },
  email: { type: String, default: '' },
  description: { type: String, default: '' },
  skills: { type: [String], default: [] },
  education: [educationSchema],
  workExperience: [experienceSchema],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;