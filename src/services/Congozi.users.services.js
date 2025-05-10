import Users from "../models/Congozi.users.model";
import bcrypt from "bcrypt";
import { uploadToCloud } from "../helper/cloud";

// Service to update a user
export const updateUser = async (id, userData, file) => {
  try {
    const user = await Users.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    // If a new profile image is provided, upload it
    if (file) {
      const result = await uploadToCloud(file);
      userData.profile = result.secure_url;
    }
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
    const updatedUser = await Users.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};
// Service to Login a user with tin or companyName
export const loginSchool = async ({ identifier, password }) => {
  const user = await Users.findOne({
    $or: [{ tin: identifier }, { companyName: identifier }],
  });

  if (!user) {
    throw new Error("User not found with provided credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};
// Service to create user
export const createUser = async (userData, file) => {
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
  } = userData;

  try {
    // Check if user already exists by email, ID card, or phone
    const [emailExist, idCardExist, phoneExist, companyNameExist, tinExist] =
      await Promise.all([
        Users.findOne({ email }),
        Users.findOne({ idCard }),
        Users.findOne({ phone }),
        Users.findOne({ companyName }),
        Users.findOne({ tin }),
      ]);

    if (emailExist) throw new Error("Email is already taken");
    if (idCardExist) throw new Error("ID card is already used");
    if (phoneExist) throw new Error("Phone number is already used");
    if (companyNameExist) throw new Error("Company Name is already used");
    if (tinExist) throw new Error("Tin number is already used");

    // Upload profile image if file is provided
    let profileUrl = null;
    if (file) {
      const result = await uploadToCloud(file);
      profileUrl = result?.secure_url;
    }

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
      profile: profileUrl,
    };

    if (role) newUserData.role = role;

    // Create user
    const user = await Users.create(newUserData);

    return {
      message: "User recorded",
      user,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Service to Login a user with phone or email
export const loginUser = async ({ identifier, password }) => {
  const isEmail = /^\S+@\S+\.\S+$/.test(identifier);

  const user = await Users.findOne(
    isEmail ? { email: identifier } : { phone: identifier }
  );

  if (!user) {
    throw new Error("User not found with provided credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};


// Service to delete a user
export const deleteUser = async (id) => {
  try {
    const user = await Users.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await Users.findByIdAndDelete(id);
    return {
      message: "User deleted successfully",
      deletedUser: user,
    };
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
// Service to get all user
export const getAllUsers = async () => {
  try {
    const users = await Users.find();
    return users;
  } catch (error) {
    throw new Error(`Error retrieving users: ${error.message}`);
  }
};
// Service to get single user
export const getUserById = async (id) => {
  try {
    const user = await Users.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error retrieving user: ${error.message}`);
  }
};
