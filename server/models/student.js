import mongoose from "mongoose";
import validator from "validator";

const StudentSchema = new mongoose.Schema({
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
    srn: {
        type: String,
        required: [true, "Please Provide srn"],
        unique:true,
        length:8,
        trim: true,
    },
    course: {
        type: String,
        required: [true, "Please Provide Course"],
        trim: true,
    },
    branch: {
        type: String,
        required: [true, "Please Provide Branch"],
        enum: ["CSE", "ECE", "MECH", "CIVIL","EEE"],
        default: "full-time",
    },
    adminId: {
        type: String,
        required: [true, "Please Provide AdminId"],
        trim: true,
    },
    isAdmin: {
        type: String,
        default:false
    },
    applyedJobId: {
        type: [String],
        default: []
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "my city",
    },
}, { timestamps: true });

export default mongoose.model("Student", StudentSchema);