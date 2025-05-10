import * as questionService from "../services/Congozi.questions.services";
import {
  validateCreateQueston,
  validateUpdateQuestion,
} from "../validation/Congozi.questions.validation";

// create question controller
export const createQuestions = async (req, res) => {
  const { error, value } = validateCreateQueston(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { id } = req.params;
    const question = await questionService.createQuestions(id, value, req.file);
    return res.status(201).json({
      status: "201",
      message: "Question created",
      data: question,
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
export const updateQuestion = async (req, res) => {
  const { error, value } = validateUpdateQuestion(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { id } = req.params;
    const updatedQuestion = await questionService.updateQuestion(
      id,
      value,
      req.file
    );

    return res.status(200).json({
      message: "Question updated",
      data: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deletsQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await questionService.deleteQuestion(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
// Display all questions for exam
export const getAllQuestions = async (req, res) => {
  try {
    const {exam} = req.params;
    const questions = await questionService.getAllQuestions(exam);
    return res.status(200).json({
      status: "200",
      message: "Questions retrieved",
      data: questions,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await questionService.getQuestionById(id);

    return res.status(200).json({
      status: "200",
      message: "Question retrieved",
      data: question,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
