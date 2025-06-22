import Questions from "../models/Heroes.questions.models";
import Options from "../models/Heroes.options.models";

export const createOption = async (id, optionData, file) => {
  const { text, isCorrect } = optionData;

  try {
    const isQuestion = await Questions.findById(id);
    if (!isQuestion) {
      throw new Error("This question does not exist");
    }
    const textExist = await Options.findOne({ text, question: id });
    if (textExist) {
      throw new Error("Option already exists for this question");
    }
    if (isCorrect === true) {
      const correctOptionExists = await Options.findOne({
        question: id,
        isCorrect: true,
      });
      if (correctOptionExists) {
        throw new Error("A question cannot have more than one correct option");
      }
    }
    const option = await Options.create({
      text,
      isCorrect,
      question: id,
    });
    await Questions.findByIdAndUpdate(
      id,
      { $push: { options: option._id } },
      { new: true }
    );

    return {
      message: "Option recorded",
      Option: option,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error creating option: ${error.message}`);
  }
};
export const updateOption = async (id, optionData) => {
  const { text, isCorrect } = optionData;

  try {
    const optionExist = await Options.findById(id);
    if (!optionExist) {
      throw new Error("Option not found");
    }
    const duplicate = await Options.findOne({
      _id: { $ne: id },
      text,
      question: optionExist.question,
    });

    if (duplicate) {
      throw new Error("This option already exists");
    }
    if (isCorrect === true && optionExist.isCorrect === false) {
      const anotherCorrect = await Options.findOne({
        _id: { $ne: id },
        question: optionExist.question,
        isCorrect: true,
      });

      if (anotherCorrect) {
        throw new Error("A question cannot have more than one correct option");
      }
    }

    const updatedOption = await Options.findByIdAndUpdate(id, optionData, {
      new: true,
    });

    return updatedOption;
  } catch (error) {
    throw new Error(`Error updating option: ${error.message}`);
  }
};
export const deleteOption = async (id) => {
  try {
    const isExist = await Options.findById(id);
    if (!isExist) {
      throw new Error("Option not found");
    }
    await Questions.updateOne(
      { _id: isExist.question },
      { $pull: { options: id } }
    );

    await Options.findByIdAndDelete(id);

    return {
      message: "Option deleted",
      deletedOption: isExist,
    };
  } catch (error) {
    throw new Error(`Error deleting option: ${error.message}`);
  }
};
export const getAllOptions = async (question) => {
  try {
    const allOptions = await Options.find({ question: question });
    return allOptions;
  } catch (error) {
    throw new Error(`Error retrieving options: ${error.message}`);
  }
};
export const getOptionById = async (id) => {
  try {
    const option = await Options.findById(id);
    if (!option) {
      throw new Error("Option not found");
    }
    return option;
  } catch (error) {
    throw new Error(`Error retrieving option: ${error.message}`);
  }
};
