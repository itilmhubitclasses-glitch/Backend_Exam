const { Lid } = require("../model/lidSchema");

// add lids
const addLid = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      trial_lesson_group_id,
      test_date,
      lid_status_id,
      trial_lesson_date,
      trial_lesson_time,
      cancel_reason_id,
    } = req.body;

    const newLid = new Lid({
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_time,
      trial_lesson_group_id,
      cancel_reason_id,
      trial_lesson_date,
      lid_status_id,
    });

    await newLid.save();

    res.status(201).json({
      success: true,
      message: "Lid suc added",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get lids
const getLids = async (req, res) => {
  try {
    const lids = await Lid.find();

    res.status(200).json({
      success: true,
      message: "All lids fetched",
      innerData: lids,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get lid by id
const getLidById = async (req, res) => {
  try {
    const { id } = req.params;

    const lid = await Lid.findById(id);

    if (!lid) {
      return res.status(404).json({
        success: false,
        message: "Lid isn't found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lid fetched successfully",
      innerData: lid,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update lid
const updateLid = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedLid = await Lid.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLid) {
      return res.status(404).json({
        success: false,
        message: "Lid not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lid successfully updated",
      data: updatedLid,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete lid
const deleteLid = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLid = await Lid.findByIdAndDelete(id);

    if (!deletedLid) {
      return res.status(404).json({
        success: false,
        message: "Lid not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lid successfully deleted",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ----------- Search Lid ----------- //
const searchLid = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Lid.find({
      $or: [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } },
        { test_date: { $regex: query, $options: "i" } },
        { trial_lesson_date: { $regex: query, $options: "i" } },
        { trial_lesson_time: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday lid topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching lid:", error);
    res.status(500).json({ message: "Server error: Failed to fetch lid" });
  }
};

module.exports = {
  addLid,
  getLids,
  getLidById,
  updateLid,
  deleteLid,
  searchLid,
};
