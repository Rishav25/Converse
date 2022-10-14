import {addMessage,getAllMessages} from "../controllers/messagesController.js";
import express from "express";

const router = express.Router();

router.post("/addmsg",addMessage);
router.post("/getmsg",getAllMessages);

export default router