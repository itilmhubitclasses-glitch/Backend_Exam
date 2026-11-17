const { Group } = require("../model/groupSchema");

// addGroup
const addGroup = async (req, res) => {
  try {
    const {
      group_name,
      lesson_start_time,
      lesson_continious,
      lesson_week_day,
      group_stage_idint,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    } = req.body;
    const existingGroup = await Group.findOne({ group_name });

    console.log(existingGroup);

    if (existingGroup) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan foydalanuvchi mavjud.",
      });
    } else {
      const newGroup = new Group({
        group_name,
        lesson_start_time,
        lesson_continious,
        lesson_week_day,
        group_stage_idint,
        room_number,
        room_floor,
        branch_id,
        lessons_quant,
        is_active,
      });
      await newGroup.save();
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

// getGroup
const getGroup = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.json({
      success: true,
      message: "Barcha group lar royhati olingan",
      innerData: groups,
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: grouplarni olishda xato yuz berdi.",
    });
  }
};

// getGroupById
const getGroupById = async (req, res) => {
  try {
    const groupId = req.params.id;

    const groups = await Group.findById(groupId).populate("branch_id");
    if (!groups) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({ message: "Group found", groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// updateGroup
const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      group_name,
      lesson_start_time,
      lesson_continious,
      lesson_week_day,
      group_stage_idint,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    } = req.body;
    const updateGroup = await Group.findByIdAndUpdate(
      id,
      {
        group_name,
        lesson_start_time,
        lesson_continious,
        lesson_week_day,
        group_stage_idint,
        room_number,
        room_floor,
        branch_id,
        lessons_quant,
        is_active,
      },
      { new: true },
    );
    if (!updateGroup) {
      return res.status(404).json({
        success: true,
        message: "groups not found",
      });
    }
    res.json({
      success: true,
      message: "Group update sucessfully!",
      groups: updateGroup,
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

// groupDelete
const groupDelete = async (req, res) => {
  try {
    const groupId = req.params.id;

    const groups = await Group.findByIdAndDelete(groupId);

    res.json({
      message: "Group del suc",
      groups,
    });

    if (!groups) {
      return res.status(404).json({
        message: "Group not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ----------- Search Group ----------- //
const searchGroup = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Group.find({
      $or: [
        { group_name: { $regex: query, $options: "i" } },
        { lesson_start_time: { $regex: query, $options: "i" } },
        { lesson_week_day: { $regex: query, $options: "i" } },
        { room_number: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday group topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching group:", error);
    res.status(500).json({ message: "Server error: Failed to fetch group" });
  }
};

module.exports = {
  addGroup,
  getGroup,
  getGroupById,
  updateGroup,
  groupDelete,
  searchGroup,
};
