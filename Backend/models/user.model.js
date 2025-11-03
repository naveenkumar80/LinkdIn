import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName : {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true, 
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
    type: String,
    required: true,
    },   
    profilePicture: {
    type: String,
    default: "",
    },
    coverPhoto: {
    type: String,
    default: "",
    },
    headline: {
    type: String,
    default: "",    
    },
    about: {
    type: String,
    default: "",    
    },
    location: {
    type: String,
    default: "",
    },
    skills: {
    type: [String],
    default: [],
    },
    education: [
        {
            school: String,
            degree: String, 
            fieldOfStudy: String,
            startDate: Date,
            endDate: Date,
            grade: String,
            activities: String,
            description: String,
        }
    ],
    experience: [
        {
            title: String,
            company: String,
            location: String,
            startDate: Date,
            endDate: Date,
            description: String,
        }
    ],
    location: {
    type: String,
    default: "",
    },
    gender :{
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Other",
    },

    connections:[
      
    ]


}, { timestamps: true });