import Questions from "../models/Congozi.questions.models";
import Options from "../models/Congozi.options.models";

export const createOption = async (id, optionData, file) => {
  const { text, isCorrect } = optionData;

  try {
    // 1. Check if the question exists
    const isQuestion = await Questions.findById(id);
    if (!isQuestion) {
      throw new Error("This question does not exist");
    }

    // 2. Check if the option with same text already exists for the same question
    const textExist = await Options.findOne({ text, question: id });
    if (textExist) {
      throw new Error("Option already exists for this question");
    }

    // 3. If isCorrect is true, ensure no other correct option exists for this question
    if (isCorrect === true) {
      const correctOptionExists = await Options.findOne({
        question: id,
        isCorrect: true,
      });
      if (correctOptionExists) {
        throw new Error("A question cannot have more than one correct option");
      }
    }

    // 4. Create the option
    const option = await Options.create({
      text,
      isCorrect,
      question: id,
    });

    // 5. Update question with the new option ID
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

// Service to update an option
export const updateOption = async (id, optionData) => {
  const { text, isCorrect } = optionData;

  try {
    const optionExist = await Options.findById(id);
    if (!optionExist) {
      throw new Error("Option not found");
    }

    // Check if another option with the same text exists for the same question
    const duplicate = await Options.findOne({
      _id: { $ne: id },
      text,
      question: optionExist.question,
    });

    if (duplicate) {
      throw new Error("This option already exists");
    }

    // If updating to true, ensure no other correct option exists in this question
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

// Service to delete an option
export const deleteOption = async (id) => {
  try {
    const isExist = await Options.findById(id);
    if (!isExist) {
      throw new Error("Option not found");
    }

    // Remove the option ID from the corresponding question's options array
    await Questions.updateOne(
      { _id: isExist.question }, // assumes each option has a `question` reference
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
// Service to get all options for given question
export const getAllOptions = async (question) => {
  try {
    const allOptions = await Options.find({ question: question });
    return allOptions;
  } catch (error) {
    throw new Error(`Error retrieving options: ${error.message}`);
  }
};
// Service to get single option
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
