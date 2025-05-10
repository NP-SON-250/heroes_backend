import * as optionService from "../services/Congozi.options.services";
import {
  validateCreateOption,
  validateUpdateOption,
} from "../validation/Congozi.options.validation";

// create option controller
export const createOptions = async (req, res) => {
  const { error, value } = validateCreateOption(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { id } = req.params;
    const option = await optionService.createOption(id, value);
    return res.status(201).json({
      status: "201",
      message: "Option created",
      data: option,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: err.message,
    });
  }
};
export const updateOption = async (req, res) => {
  const { error, value } = validateUpdateOption(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { id } = req.params;
    const updatedOption = await optionService.updateOption(id, value);

    return res.status(200).json({
      message: "Option updated",
      data: updatedOption,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deletsOption = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await optionService.deleteOption(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
// Display all option for question
export const getAllOptions = async (req, res) => {
  try {
    const { question } = req.params;
    const options = await optionService.getAllOptions(question);
    return res.status(200).json({
      status: "200",
      message: "Options retrieved",
      data: options,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getOptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const option = await optionService.getOptionById(id);

    return res.status(200).json({
      status: "200",
      message: "Option retrieved",
      data: option,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
