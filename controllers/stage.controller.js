const { Stage } = require("../model/stageSchema");

// ------- Add stage --------//
const addStage = async (req, res) => {
  try {
    const { names } = req.body;
    const existingStage = await Stage.findOne({ names });

    console.log(existingStage);

    if (existingStage) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan Stage mavjud.",
      });
    } else {
      const newStage = new Stage({
        names,
      });
      await newStage.save();
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

// ======== get stage ======== //
const getStage = async (req, res) => {
  try {
    const stages = await Stage.find({});
    res.json({
      success: true,
      message: "Barcha rollar royhati olingan",
      innerData: stages,
    });
  } catch (error) {
    console.error("Error fetching stages:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Stage olishda xato yuz berdi.",
    });
  }
};

//  ======= get stage by id ======== //
const getStageById = async (req, res) => {
  try {
    const stageId = req.params.id;

    const names = await Stage.findById(stageId);
    if (!names) {
      return res.status(404).json({ message: "Stage not found" });
    }

    res.json({ message: "Stage found", names });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ====== delete stage by id ========= //
const stageDelete = async (req, res) => {
  try {
    const stageId = req.params.id;

    const names = await Stage.findByIdAndDelete(stageId);

    res.json({
      message: "Stage deleted succesfully",
      name,
    });

    if (!name) {
      return res.status(404).json({
        message: "Stage not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ======= update Stage by id ======= //
const updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateStage = await Stage.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    if (!updateStage) {
      return res.status(404).json({
        success: true,
        message: "Stage not found",
      });
    }
    res.json({
      success: true,
      message: "User update sucessfully!",
      name: updateStage,
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

module.exports = {
  addStage,
  getStage,
  getStageById,
  stageDelete,
  updateStage,
};
