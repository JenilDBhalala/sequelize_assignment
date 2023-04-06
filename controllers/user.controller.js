const User = require("../models/user.model");

module.exports = {

  addUser: async (req, res, next) => {
    try {
      await User.create(req.body.user);
      res.status(201).json({ message: "user added sucessfully" });
    } catch (error) {
      next(error);
    }
  },

  updateUser : async (req, res, next) => {
    try {
      const [result] = await User.update(req.body.user, {
        where: {
          id: req.params.userID,
        },
      });
    
      if (result) {
        res.status(200).json({ message: "user updated sucessfully" });
      } else {
        res.status(404).json({ message: "user not found!" });
      }
    } catch (error) {
      next(error);
    }
  },


  deleteUser : async (req, res, next) => {
    try {
      const result = await User.destroy({
        where: {
          id: req.params.userID,
        },
      });
      if (result) {
        res.status(200).json({ message: "user deleted sucessfully" });
      } else {
        res.status(404).json({ message: "user not found!" });
      }
    } catch (error) {
      next(error);
    }
  },


  getUsers : async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },


  getUsersByID : async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userID);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found!" });
      }
    } catch (error) {
      next(error);
    }
  }
}

// module.exports = { addUser, updateUser, deleteUser, getUsers, getUsersByID };