import {
    registerStudent,
    updateAdmin,
    deleteAdmin,
    getAdmin,
    getStudents,
    getJobs
} from "../controllers/adminController.js";
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//CREATE A STUDENT
router.post("/studentregister/:id",verifyToken, registerStudent);

//UPDATE ADMIN
router.put("/:id", verifyToken, updateAdmin);

//DELETE ADMIN
router.delete("/:id", verifyToken, deleteAdmin);

//GET ADMIN
router.get("/:id", getAdmin);

//GET ALL CREATED JOBS
router.get("/jobs/:id", verifyToken, getJobs);

//GET STUDENTS
router.get("/students/:id", verifyToken, getStudents);




export default router;