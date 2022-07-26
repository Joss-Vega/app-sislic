const express = require("express");

const userRouter = express.Router();

const {
  getAccessFromRoleName,
  createUser,
  getAllRoles,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const { checkTokenMonitor, hasRole } = require("../auth/token_validation");
userRouter.get("/access/:role", getAccessFromRoleName);
userRouter.get("/roles", getAllRoles);

userRouter.get("/user", getAllUsers);
userRouter.post("/user", createUser);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/user/:id_user", deleteUser);

module.exports = userRouter;
