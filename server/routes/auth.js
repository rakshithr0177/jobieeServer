import express from "express";
import { registerAdmin, loginAdmin, loginStudent } from '../controllers/authController.js';


const router = express.Router();

//CREATE  A ADMIN
router.post("/admin/register", registerAdmin)

//SIGN IN ADMIN
router.post("/admin/login", loginAdmin)


//SIGN IN STUDENT
router.post("/student/login", loginStudent)


export default router;