import { createError } from '../error.js';
import Admin from '../models/admin.js';
import Student from '../models/student.js';
import Job from '../models/job.js';
import bcrypt from 'bcryptjs';

export const registerStudent = async (req, res, next) => {
    if (req.user.id === req.params.adminId) {
        try {
            const admin = await Admin.findById(req.params.adminId);
            if (!admin) {
                return next(createError(500,"You are not an admin"))
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newStudent = new Student(
                {
                    adminId: req.params.adminId,
                    ...req.body,
                    password: hash
                }
            );

            await newStudent.save();

            await Admin.findByIdAndUpdate(req.params.adminId, {
                $addToSet: { studentId: newStudent._id }
            })

            res.status(200).send("student has been created!")
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "only admin can create the student!"));
    }
}


export const updateStudent = async (req,res,next) => {
    if (req.params.id === req.user.id) {
        try {
            const updateStudent = await Student.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updateStudent);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
}

export const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student.adminId !== req.user.id) {
            return next(createError(500,"you can delete only your student"))
        }
        await Admin.findByIdAndUpdate(student.adminId, {
            $pull: { studentId: req.params.id }
        })
        await Student.findByIdAndDelete(req.params.id);

        res.status(200).json("student Deleted");
    } catch (err) {
        next(err);
    }
}
export const getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);
        const { password, ...others } = student._doc;
        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
}

export const getApplyedJobs = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const jobs = await Student.findById(req.params.id);
            const jobIds = jobs.applyedJobId;
            const jobsAll = await Promise.all(
                jobIds.map((jobId) => {
                    return Job.findById(jobId);
                })
            )
            res.status(200).json(jobsAll);
        } catch (err) {
            next(err)
        }
    }
    else {
        return next(createError(403, "You can see only your jobs!"));
    }
}

