import {Router} from "express"
import { login, register } from "../Controllers/user.controller.js";
export const UserRoute=Router();

UserRoute.post('/register',register)
UserRoute.post('/login',login)
