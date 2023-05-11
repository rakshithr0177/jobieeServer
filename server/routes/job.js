import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
    createJob,
    updateJob,
    deleteJob,
    applyJob,
    getAllJob,
    getJob
} from '../controllers/jobController.js'

const router = express.Router();

// CREATE JOBS
router.post("/:adminId", verifyToken ,createJob);

//UPDATE JOBS
router.put("/:jobId", verifyToken ,updateJob);

//GET ALL JOBS
router.get("/", getAllJob);

//GET JOB
router.get("/:jobId", getJob);

//DELETE JOB
router.delete("/:jobId",verifyToken,deleteJob);

//APPLY JOB
router.put("/apply/:jobId",verifyToken,applyJob);


export default router;