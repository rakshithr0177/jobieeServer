import { createError } from '../error.js';
import Admin from '../models/admin.js';
import Student from '../models/student.js';
import Job from '../models/job.js';


export const createJob = async (req, res, next) => {
    
    try {
        const admin = await Admin.findById(req.user.id);
        if (!admin) {
            return next(createError(500,"Only admin can create job"))
        }
        const newJob = new Job({ createdBy: admin.id, ...req.body });
        const savedJob = await newJob.save();
        await Admin.findByIdAndUpdate(admin.id, {
            $push: { jobId: newJob._id }
        })
        res.status(200).json(savedJob)
    } catch (err) {
        next(err)
    }
} 


export const updateJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (job.createdBy === req.user.id) {
            const updatedJob = await Job.findByIdAndUpdate(
                job._id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedJob)
        }
        else {
            next(createError(500,"You can update only your jobs"))
        }
    } catch (err) {
        next(err)
    }
} 


export const deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (job.createdBy === req.user.id) {
            await Job.findByIdAndDelete(
                req.params.jobId,
            );
            await Admin.findByIdAndUpdate(job.createdBy, {
                $pull: { jobId: req.params.jobId }
            })
            
            res.status(200).json("Job deleted")
        }
        else {
            next(createError(500, "You can delete only your jobs"))
        }
    } catch (err) {
        next(err)
    }
}

export const getAllJob = async(req,res,next) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        next(err)
    }
}

export const getJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.jobId);
        res.status(200).json(job);
    } catch (err) {
        next(err)
    }
}

export const applyJob = async (req,res,next) => {
    try {
        const student = await Student.findById(req.user.id);
        if (!student) {
            return next(createError(500,"Only students can apply"))
        }
        const updated = await Student.findByIdAndUpdate(student.id, {
            $push: { applyedJobId: req.params.jobId }
        })
        res.status(200).json(updated);
    } catch (err) {
        next(err)
    }
}