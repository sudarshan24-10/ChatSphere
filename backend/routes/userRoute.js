import express from "express";
import { getUser } from "../controller/userController.js";

const UserRouter = express.Router();


UserRouter.get("/getUsers", getUser)



export default UserRouter;