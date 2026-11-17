const { Lid_status } = require("../model/lid_statusSchema");

// Add lid_status
const addLid_status = async (req, res) => {
  try {
    const { status } = req.body;
    const existingLid_status = await Lid_status.findOne({ status });

    console.log(existingLid_status);

    if (existingLid_status) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan foydalanuvchi mavjud.",
      });
    } else {
      const newLid_status = new Lid_status({
        status,
      });
      await newLid_status.save();
      return res.status(201).json({
        success: true,
        message: "Royxatdan otish muvaffaaqiyatli yakunlandi.",
      });
    }
  } catch (error) {
    console.error("Xato:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Ro'yxatdan otish jarayonida xato yuz berdi",
    });
  }
};

// get lid_status
const getLid_status = async (req, res) => {
  try {
    const lid_status = await Lid_status.find({});
    res.json({
      success: true,
      message: "Barcha status lar royhati olingan",
      innerData: lid_status,
    });
  } catch (error) {
    console.error("Error fetching lid_status:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: lid_status olishda xato yuz berdi.",
    });
  }
};

// get lid_status by id
const getLid_statusById = async (req, res) => {
  try {
    const lid_statusId = req.params.id;

    const status = await Lid_status.findById(lid_statusId);
    if (!status) {
      return res.status(404).json({ message: "lid_status not found" });
    }

    res.json({ message: "Lid_status found", status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update lid_status by id
const updateLid_status = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateLid_status = await Lid_status.findByIdAndUpdate(
      id,
      {status},
      { new: true },
    );
    if (!updateLid_status) {
      return res.status(404).json({
        success: true,
        message: "Lid_status not found",
      });
    }
    res.json({
      success: true,
      message: "Lid_status update sucessfully!",
      status: updateLid_status,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal sever Error",
      error: error.message,
    });
  }
};

// delete lid_status by id
const lid_statusDelete = async (req, res) => {
  try {
    const lid_statusId = req.params.id;

    const status = await Lid_status.findByIdAndDelete(lid_statusId);

    res.json({
      message: "lid_status deleted succesfully",
      status,
    });

    if (!status) {
      return res.status(404).json({
        message: "lid_status not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const searchLid_status = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Lid_status.find({
      $or: [
        { status: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday lid_status topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching lid_status:", error);
    res.status(500).json({ message: "Server error: Failed to fetch lid_status" });
  }
};

module.exports = {
  addLid_status,
  getLid_status,
  getLid_statusById,
  updateLid_status,
  lid_statusDelete,
  searchLid_status,
};

