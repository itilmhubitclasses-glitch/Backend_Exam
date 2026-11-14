const { Role } = require("../model/roleSchema");

// ------- Add Role --------//
const addRole = async (req, res) => {
  try {
    const { name } = req.body;
    const existingRole = await Role.findOne({ name });

    console.log(existingRole);

    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan foydalanuvchi mavjud.",
      });
    } else {
      const newRole = new Role({
        name,
      });
      await newRole.save();
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

// ---------- Get Roles --------------//
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json({
      success: true,
      message: "Barcha rollar royhati olingan",
      innerData: roles,
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Role olishda xato yuz berdi.",
    });
  }
};

// ---------Get roles by ID --------------//
const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;

    const name = await Role.findById(roleId);
    if (!name) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Role found", name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------- Role delete --------------- //
const roleDelete = async (req, res) => {
  try {
    const roleId = req.params.id;

    const name = await Role.findByIdAndDelete(roleId);

    res.json({
      message: "User deleted succesfully",
      name,
    });

    if (!name) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// -------------- role update --------- //
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateRole = await Role.findByIdAndUpdate(
      id,
      {name},
      { new: true },
    );
    if (!updateRole) {
      return res.status(404).json({
        success: true,
        message: "Role not found",
      });
    }
    res.json({
      success: true,
      message: "Role update sucessfully!",
      name: updateRole,
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

// ----------- Search Name ----------- //
const searchRole = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Role.find({
      $or: [
        { name: { $regex: query, $options: "i" } }
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (err) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error: Failed to fetch users" });
  }
};

module.exports = {
  addRole,
  getRoles,
  getRoleById,
  roleDelete,
  updateRole,
  searchRole,
};
