import * as userService from "../services/Congozi.users.services";
import {
  validateLoginUser,
  validateUpdateUser,
} from "../validation/Congozi.users.validation";
import generateToken from "../utils/generateToken";
import Users from "../models/Congozi.users.model";
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
// create user controller
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
    // Check if user already exists by email, ID card, tin, companyName, or phone
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
    // Upload profile image if file is provided
    let savedProfile;
    if (req.file) savedProfile = await uploadToCloud(req.file, res);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user object
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
    };

    // Create user
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
// Controller to login function
export const login = async (req, res) => {
  const { error, value } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await userService.loginUser(value);
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
// Controller to login function by schools
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
