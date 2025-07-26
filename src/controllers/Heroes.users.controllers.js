import * as userService from "../services/Heroes.users.services";
import {
  validateLoginUser,
  validateUpdateUser,
} from "../validation/Heroes.users.validation";
import generateToken from "../utils/generateToken";
import Users from "../models/Heroes.users.model";
import bcrypt from "bcrypt";
import { uploadToCloud } from "../helper/cloud";

export const updateUser = async (req, res) => {
  const { error, value } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, value, req.file);

    return res.status(200).json({
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo kidasanzwe",
      error: error.message,
    });
  }
};
export const createUsers = async (req, res, file) => {
  const {
    fName,
    lName,
    idCard,
    address,
    phone,
    email,
    password,
    role,
    companyName,
    tin,
  } = req.body;
  try {
    if (email) {
      const emailExist = await Users.findOne({ email: email });
      if (emailExist) {
        return res.status(400).json({
          status: "400",
          message: "Email is already taken",
        });
      }
    }
    if (idCard) {
      const idCardExist = await Users.findOne({ idCard: idCard });
      if (idCardExist) {
        return res.status(400).json({
          status: "400",
          message: "ID card is already used",
        });
      }
    }
    if (phone) {
      const phoneExist = await Users.findOne({ phone: phone });
      if (phoneExist) {
        return res.status(400).json({
          status: "400",
          message: "Phone number is already used",
        });
      }
    }
    if (companyName) {
      const companyNameExist = await Users.findOne({
        companyName: companyName,
      });
      if (companyNameExist) {
        return res.status(400).json({
          status: "400",
          message: "Company name is already used",
        });
      }
    }
    if (tin) {
      const tinExist = await Users.findOne({ tin });
      if (tinExist) {
        return res.status(400).json({
          status: "400",
          message: "Tin number is already used",
        });
      }
    }
    let savedProfile;
    if (req.file) {
      const uploadResult = await uploadToCloud(req.file, res);
      savedProfile = uploadResult.secure_url;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      fName,
      lName,
      idCard,
      address,
      phone,
      email,
      companyName,
      tin,
      password: hashedPassword,
      profile: savedProfile,
      role,
    };
    const user = await Users.create(newUserData);

    return res.status(200).json({
      status: "200",
      message: "Kwiyandsha byakunze",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo kidasanzwe",
      error: err.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!user) {
      return res.status(404).json({
        status: "404",
        message: "User name not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "400",
        message: "Invalid password",
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      message: "Kwinjira byakunze",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo kidasanzwe",
      error: error.message,
    });
  }
};
export const loginSchools = async (req, res) => {
  const { error, value } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await userService.loginSchool(value);
    const token = generateToken(user._id);
    res.status(200).json({
      message: "Kwinjira byakunze",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo kidasanzwe",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userService.deleteUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo kidasanzwe",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      status: "200",
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo kidasanzwe",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    return res.status(200).json({
      status: "200",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo kidasanzwe",
      error: error.message,
    });
  }
};

export const getLastWeekUsersCount = async (req, res) => {
  try {
    const today = new Date();

    const startOfLastWeek = new Date(today);
    startOfLastWeek.setDate(today.getDate() - 14);
    startOfLastWeek.setHours(0, 0, 0, 0);

    const endOfLastWeek = new Date(today);
    endOfLastWeek.setDate(today.getDate() - 7);
    endOfLastWeek.setHours(23, 59, 59, 999);

    const count = await Users.countDocuments({
      createdAt: {
        $gte: startOfLastWeek,
        $lte: endOfLastWeek,
      },
    });

    return res.status(200).json({
      status: "200",
      message: "Users created during last week",
      count: count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCurrentWeekUsersCount = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const count = await Users.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });

    return res.status(200).json({
      status: "200",
      message: "Current week users counts",
      count: count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
