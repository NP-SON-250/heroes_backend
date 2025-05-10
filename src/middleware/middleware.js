import Jwt from "jsonwebtoken";
import Users from "../models/Congozi.users.model";

//students
export const students = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Pleace, login again",
      });
    }
    if (loggedInUser.role != "student") {
      return res.status(401).json({
        status: "401",
        message: "Only student user can do this operation",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};
//Schools
export const schools = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Please, login again",
      });
    }
    if (loggedInUser.role != "school") {
      return res.status(401).json({
        status: "401",
        message: "Only school user can do this operation",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};

//admin
export const admins = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Pleace, login again",
      });
    }
    if (loggedInUser.role != "admin") {
      return res.status(401).json({
        status: "401",
        message: "Only admin can do this operation",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};
// Normal
export const normal = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Please, login again",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};
