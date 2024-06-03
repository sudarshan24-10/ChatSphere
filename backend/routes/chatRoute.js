import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createChat,createGroupChat,getChats,renameGroupChat,addToGroupChat,removeFromGroupChat } from "../controller/chatController.js";


const ChatRouter = express.Router();

ChatRouter.post("/createChat",verifyToken,createChat)
ChatRouter.get("/getChats",verifyToken,getChats)
ChatRouter.post("/createGroupChat",verifyToken,createGroupChat)
ChatRouter.put("/renameGroupChat",verifyToken,renameGroupChat)
ChatRouter.put("/addToGroupChat",verifyToken,addToGroupChat)
ChatRouter.put("/removeFromGroupChat",verifyToken,removeFromGroupChat)


export default ChatRouter;