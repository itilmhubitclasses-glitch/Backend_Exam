const { Stuff_role } = require("../model/Stuff_roleSchema");

//------------------------ add stuff_role----------------------//
const addStuff_role = async (req, res) => {
  try {
    const { role_id, stuff_id } = req.body;
    const existingStuff_role = await Stuff_role.findOne({ role_id, stuff_id });
    console.log(existingStuff_role);

    if (existingStuff_role) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan Stuff mavjud.",
      });
    } else {
      const newStuff_role = new Stuff_role({
        role_id,
        stuff_id,
      });

      await newStuff_role.save();

      return res.status(201).json({
        success: true,
        message: "Royxatdan otish muvaffaqiyatli yakunlandi.",
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

// --------------- get stuff_role ------------ //
const getStuff_role = async (req, res) => {
  try {
    const stuff_role = await Stuff_role.find({});
    res.json({
      success: true,
      message: "Barcha stafflar royhati olingan",
      innerData: stuff_role,
    });
  } catch (error) {
    console.error("Error fetching stuff_role:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: stuff_role olishda xato yuz berdi.",
    });
  }
};

// =========== Get stuff by id ========== //
const getStuff_roleById = async (req, res) => {
  try {
    const stuff_role_id = req.params.id;

    const stuff_role = await Stuff_role.findById(stuff_role_id);
    if (!stuff_role) {
      return res.status(404).json({ message: "Stuff_role not found" });
    }

    res.json({ message: "Stuff_role found", stuff_role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ============ Delete Stuff_role by id ======== //
const stuff_roleDelete = async (req, res) => {
  try {
    const stuff_role_id = req.params.id;

    const stuff_role = await Stuff_role.findByIdAndDelete(stuff_role_id);

    res.json({
      message: "Stuff_role deleted succesfully",
      stuff_role,
    });

    if (!stuff_role) {
      return res.status(404).json({
        message: "Stuff_role not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ========= stuff_role update by id ========= //
const updateStuff_role = async (req, res) => {
  try {
    const { id } = req.params;
    const {role_id, stuff_id} = req.body;
    const updateStuff_role = await Stuff_role.findByIdAndUpdate(
      id,
      { role_id, stuff_id },
      { new: true },
    );
    if (!updateStuff_role) {
      return res.status(404).json({
        success: true,
        message: "stuff_role not found",
      });
    }
    res.json({
      success: true,
      message: "stuff_role update sucessfully!",
      user: updateStuff_role,
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
  addStuff_role,
  getStuff_role,
  getStuff_roleById,
  stuff_roleDelete,
  updateStuff_role
};
