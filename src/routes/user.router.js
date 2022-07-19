const express = require("express");

const userRouter = express.Router();

const {
  getAccessFromRoleName,
  createUser,
  getAllRoles,
  getAllUsers,
  updateUser,
} = require("../controllers/user.controller");

const { checkTokenMonitor, hasRole } = require("../auth/token_validation");
userRouter.get("/", getAllUsers);
userRouter.get("/access/:role", getAccessFromRoleName);
userRouter.post("/create", createUser);
userRouter.put("/update/:id", updateUser);
userRouter.get("/roles", getAllRoles);

module.exports = userRouter;
