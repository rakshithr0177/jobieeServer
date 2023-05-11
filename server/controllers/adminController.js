import { createError } from '../error.js';
import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import Student from '../models/student.js';
import Job from '../models/job.js';


export const registerStudent = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newStudent = new Student(
                {
                    adminId: req.params.id,
                    ...req.body,
                    password: hash
                }
            );

            await newStudent.save();

            await Admin.findByIdAndUpdate(req.params.id, {
                $addToSet: { studentId: newStudent._id }
            })

            res.status(200).send("student has been created!")
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "Admin can create only students!"));
    }
}

export const updateAdmin = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedAdmin = await Admin.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            const { password, ...others } = updatedAdmin._doc;
            res.status(200).json(others);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
};

export const deleteAdmin = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            // const studentIds = await Admin.findById(req.params.id).studentId;

            // studentIds.map(async(studentId) => {
            //     await Student.findByIdAndDelete(studentId);
            // })

            await Student.deleteMany({ adminId : req.params.id});

            await Admin.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!");
        } catch (err) {
            next(err);
        }
    } else {
        console.log("hello error")
        return next(createError(403, "You can delete only your account!"));
    }
}

export const getAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);
        const { password, ...others } = admin._doc;
        res.status(200).json(others);
    } catch (err) {
        next(errorHandler(err))
    }
}



export const getStudents = async (req, res, next) => {
    if (req.params.id === req.user.id) { 
        try {
            // const students = await Admin.findById(req.params.id);
            // const studentIds = students.studentId;
            // const studentsAll = await Promise.all(
            //     studentIds.map((studentId) => {
            //         return Student.findById(studentId);
            //     })
            // )

            const allStudents = await Student.find({adminId:req.params.id})
            
            res.status(200).json(allStudents);
        } catch (err) {
            next(err)
        }
    } else {
        console.log("hello error")
        return next(createError(403, "You can see only your students!"));
    }
    
}

export const getAllAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    } catch (err) {
        next(errorHandler(err))
    }
}

export const getJobs = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const jobs = await Job.find({ createdBy: req.params.id })

            res.status(200).json(jobs);
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You can see only your jobs!"));
    }

}
