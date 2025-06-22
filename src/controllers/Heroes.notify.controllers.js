import Notify from "../models/Heroes.notifies.models";
export const createNote = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const { message, noteTitle, purchasedItem, ownerName } = req.body;
    const isMessage = await Notify.findOne({ message, notifiedBy: userId });
    if (isMessage) {
      return res.status(400).json({
        status: "400",
        message: "Irimenyekanisha ryaroherejwe",
      });
    }
    const createdNotes = await Notify.create({
      message,
      notifiedBy: userId,
      noteTitle,
      purchasedItem,
      ownerName,
    });
    return res.status(200).json({
      status: "200",
      message: "Kumenyekanisha inyemezabwishyu byakunze",
      data: createdNotes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo",
      error: error.message,
    });
  }
};

export const allData = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const userRole = req.loggedInUser.role;

    let allnotes;

    if (userRole === "admin" || userRole === "supperAdmin") {
      allnotes = await Notify.find({ status: "Under Review" });
    } else {
      allnotes = await Notify.find({
        notifiedBy: userId,
        status: "Access Granted",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Notifications fetched",
      data: allnotes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo",
      error: error.message,
    });
  }
};
export const singleData = async (req, res) => {
  try {
    const { id } = req.params;
    const single = await Notify.findById(id);
    if (!single) {
      return res.status(404).json({
        status: "200",
        message: "Notification not found",
        data: allnotes,
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Notifications fetched",
      data: single,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo",
      error: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const itemDelete = await Notify.findById(id);
    if (!itemDelete) {
      return res.status(404).json({
        status: "404",
        message: "Ububutumwa ntibubashije kuboneka",
      });
    }
    await Notify.findByIdAndDelete(id);
    return res.status(200).json({
      status: "200",
      message: "Ububutumwa bushyizwe mububiko",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Habayemo ikibazo",
      error: error.message,
    });
  }
};
