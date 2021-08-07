import express from "express";
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
        .post(registerUser)
        .get(protect, admin, getUsers);


router.post("/login", authUser); 
// router.route('/login').post(authUser); this worked perfectly too

// middlewares are passed in the front of function
router.route("/profile")
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile);
        
router.route("/:id")
        .delete(protect, admin, deleteUser)
        .get(protect, admin, getUserById)
        .put(protect, admin, updateUser)

export default router;
