import express from "express";
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl, updateShippingAddressCtrl } from "../controllers/usersCtrl.js";
import { isloggedin } from "../middlewares/isloggedin.js";

const UserRoutes = express.Router();
UserRoutes.post('/register', registerUserCtrl);
UserRoutes.post('/login', loginUserCtrl);
UserRoutes.get('/profile', isloggedin, getUserProfileCtrl);
UserRoutes.put('/update/shipping', isloggedin, updateShippingAddressCtrl);
export default UserRoutes;