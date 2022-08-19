const { Router } = require("express");

const userRouter = Router();

const {
  getAccessFromRoleName,
  createUser,
  getAllRoles,
  getAllUsers,
  updateUser,
  deleteUser,
  getAccess,
  getAccessByIdRol,
  createRole,
  deleteRoleById,
} = require("../controllers/user.controller");

const passport = require("passport");
require("../auth/strategies/jwt.strategy");
userRouter.get(
  "/access",
  passport.authenticate("jwt", { session: false }),
  getAccessFromRoleName
);
userRouter.post("/roles", createRole);
userRouter.delete("/roles/:id_rol", deleteRoleById);

userRouter.get("/roles", getAllRoles);
userRouter.get("/access/all", getAccess);
userRouter.get("/access/unique/:id_rol", getAccessByIdRol);

userRouter.get("/user", getAllUsers);
userRouter.post("/user", createUser);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/user/:id_user", deleteUser);

module.exports = userRouter;
