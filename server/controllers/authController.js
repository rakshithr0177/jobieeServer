import { createError } from '../error.js';
import Admin from '../models/admin.js';
import Student from '../models/student.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newAdmin = new Admin(
            {
                ...req.body,
                password: hash
            }
        );

        await newAdmin.save();
        
        res.status(200).json("user created")

        res.status(200).send("user has been created!")
    } catch (err) {
        next(err)
    }
}

export const loginAdmin = async (req,res,next) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin)
            return next(createError(404, "user not find"))
        
        const isCorrect = await bcrypt.compare(req.body.password, admin.password);
        if (!isCorrect)
            return next(createError(400, "wrong credentails"))
        
        const { password, ...others } = admin._doc;

        const token = jwt.sign({ id: admin._id }, process.env.JWT);

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)
        

    } catch (err) {
        next(err)
    }
}









export const loginStudent = async (req, res, next) => {
    try {
        const student = await Student.findOne({ email: req.body.email });
        if (!student)
            return next(createError(404, "user not find"))

        const isCorrect = await bcrypt.compare(req.body.password, student.password);
        if (!isCorrect)
            return next(createError(400, "wrong credentails"))
        const { password, ...others } = student._doc;
        const token = jwt.sign({ id: student._id }, process.env.JWT);
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)


    } catch (err) {
        next(err)
    }
}
