const {Reason_lid} = require("../model/Reason_lidSchema");

// Add reason_lid
const addReason_lid = async (req, res) => {
  try {
    const { reason_lid } = req.body;
    const existingReason_lid = await Reason_lid.findOne({ reason_lid });

    console.log(existingReason_lid);

    if (existingReason_lid) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan reason_lid mavjud.",
      });
    } else {
      const newReason_lid = new Reason_lid({
        reason_lid,
      });
      await newReason_lid.save();
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

//  get reason_lid
const getReason_lid = async (req, res) => {
  try {
    const reason_lid = await Reason_lid.find({});
    res.json({
      success: true,
      message: "Barcha rollar royhati olingan",
      innerData: reason_lid,
    });
  } catch (error) {
    console.error("Error fetching reason_lid:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Reason_lid olishda xato yuz berdi.",
    });
  }
};

// get reason_lid by id
const getReason_lidById = async (req, res) => {
  try {
    const reason_lidId = req.params.id;

    const reason_lid = await Reason_lid.findById(reason_lidId);
    if (!reason_lid) {
      return res.status(404).json({ message: "Reason_lid not found" });
    }

    res.json({ message: "Role found", reason_lid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update reason_lid by id
const updateReason_lid = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason_lid } = req.body;
    const updateReason_lid = await Reason_lid.findByIdAndUpdate(
      id,
      {reason_lid},
      { new: true },
    );
    if (!updateReason_lid) {
      return res.status(404).json({
        success: true,
        message: "Reason_lid not found",
      });
    }
    res.json({
      success: true,
      message: "Reason_lid update sucessfully!",
      reason_lid: updateReason_lid,
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

// delete reason_lid by id
const reason_lidDelete = async (req, res) => {
  try {
    const reason_lidId = req.params.id;

    const reason_lid = await Reason_lid.findByIdAndDelete(reason_lidId);

    res.json({
      message: "Reason_lid deleted succesfully",
      reason_lid,
    });

    if (!reason_lid) {
      return res.status(404).json({
        message: "Reason_lid not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
    addReason_lid,
    getReason_lid,
    getReason_lidById,
    updateReason_lid,
    reason_lidDelete,
}