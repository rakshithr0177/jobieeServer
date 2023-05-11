import express from "express";
import {
    registerStudent,
    updateStudent,
    deleteStudent,
    getStudent,
    getApplyedJobs
} from "../controllers/studentController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//CREATE A STUDENT
router.post("/register/:adminId", verifyToken, registerStudent);

//UPDATE STUDENT
router.put("/:id", verifyToken, updateStudent);

//DELETE STUDENT
router.delete("/:id", verifyToken, deleteStudent);

//GET STUDENT
router.get("/:id", getStudent);

//GET APPLY JOBS
router.get("/jobs/:id", verifyToken, getApplyedJobs)

export default router;

