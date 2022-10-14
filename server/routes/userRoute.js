import express from "express";

import { registerUser, loginUser, setAvatarForUser, getAllUsers} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/setavatar/:id", setAvatarForUser);

router.get("/allusers/:id" , getAllUsers);


export default router;
