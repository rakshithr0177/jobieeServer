import mongoose from "mongoose";
import validator from "validator";

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide name"],
        minLength: 3,
        maxLength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please Provide name"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email",
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Provide password"],
        unique: true,
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "lastname",
    },
    universityName: {
        type: String,
        required: [true, "Please enter your university name"],
    },
    studentId: {
        type: [String],
        default:[],
    },
    jobId: {
        type: [String],
        default: [],
    },
    isAdmin: {
        type: String,
        default: true
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "my city",
    },
}, { timestamps: true });

export default mongoose.model("Admin", AdminSchema);

