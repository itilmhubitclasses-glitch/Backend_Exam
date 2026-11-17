const { Branch } = require("../model/branchSchema");

// ------- Add Branch --------//
const addBranch = async (req, res) => {
  try {
    const { nameb, address, call_number } = req.body;
    const existingBranch = await Branch.findOne({ nameb });

    console.log(existingBranch);

    if (existingBranch) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan foydalanuvchi mavjud.",
      });
    } else {
      const newRole = new Branch({
        nameb,
        address,
        call_number,
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

// -------- Get Branches -------- //
const getBranch = async (req, res) => {
  try {
    const branch = await Branch.find({});
    res.json({
      success: true,
      message: "Barcha rollar royhati olingan",
      innerData: branch,
    });
  } catch (error) {
    console.error("Error fetching branch:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Branch olishda xato yuz berdi.",
    });
  }
};

//  -------- Get Branch by id ------- //
const getBranchById = async (req, res) => {
  try {
    const branchId = req.params.id;

    const nameb = await Branch.findById(branchId);
    if (!nameb) {
      return res.status(404).json({ message: "Branc not found" });
    }

    res.json({ message: "Branch found", nameb });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------- updateBranch ---------- //
const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameb } = req.body;
    const updateBranch = await Branch.findByIdAndUpdate(
      id,
      {nameb},
      { new: true },
    );
    if (!updateBranch) {
      return res.status(404).json({
        success: true,
        message: "Branch not found",
      });
    }
    res.json({
      success: true,
      message: "Branch update sucessfully!",
      nameb: updateBranch,
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

// --------- Delete Branch ------ //
const branchDelete = async (req, res) => {
  try {
    const branchId = req.params.id;

    const nameb = await Branch.findByIdAndDelete(branchId);

    res.json({
      message: "Branc deleted succesfully",
      nameb,
    });

    if (!nameb) {
      return res.status(404).json({
        message: "Branc not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ----------- Search Branch ----------- //
const searchBranch = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Branch.find({
      $or: [
        { nameb: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { call_number: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday branch topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching branch:", error);
    res.status(500).json({ message: "Server error: Failed to fetch branch" });
  }
};

module.exports = {
  addBranch,
  getBranch,
  getBranchById,
  updateBranch,
  branchDelete,
  searchBranch,
};