const { Stuff } = require("../model/stuffSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// -------- addStuff --------- //
const addStuff = async (req, res) => {
  try {
    const { firstname, lastname, phone_number, login, parol, is_active } =
      req.body;
    const existingStuff = await Stuff.findOne({ login });

    console.log(existingStuff);

    if (existingStuff) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan Stuff mavjud.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(parol, 10);
      const newStuff = new Stuff({
        firstname,
        lastname,
        phone_number,
        login,
        parol: hashedPassword,
        is_active,
      });
      await newStuff.save();
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

// --------------Get Stuffs------------//
const getStuff = async (req, res) => {
  try {
    const stuff = await Stuff.find({});
    res.json({
      success: true,
      message: "Barcha Stuff larni royhati olingan",
      innerData: stuff,
    });
  } catch (error) {
    console.error("Error fetching stuffs:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Stuff olishda xato yuz berdi.",
    });
  }
};

// --------------- Get by id --------- //
const getStuffById = async (req, res) => {
  try {
    const stuffId = req.params.id;

    const stuff = await Stuff.findById(stuffId);
    if (!stuff) {
      return res.status(404).json({ message: "Stuff not found" });
    }

    res.json({ message: "Stuff found", stuff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------- Delete Stuff by id ----------//
const deleteStuff = async (req, res) => {
  try {
    const stuffId = req.params.id;

    const stuff = await Stuff.findByIdAndDelete(stuffId);

    res.json({
      message: "Stuff del suc",
      stuff,
    });

    if (!stuff) {
      return res.status(404).json({
        message: "Stuff not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// -------- update Stuff by id ------- //
const updateStuff = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, phone_number, login, parol, is_active } =
      req.body;
    const updateStuff = await Stuff.findByIdAndUpdate(
      id,
      { firstname, lastname, phone_number, login, parol, is_active },
      { new: true },
    );
    if (!updateStuff) {
      return res.status(404).json({
        success: true,
        message: "user not found",
      });
    }
    res.json({
      success: true,
      message: "Stuff update sucessfully!",
      user: updateStuff,
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



// ----------- Search Stuff ----------- //
const searchStuff = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Stuff.find({
      $or: [
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } },
        { login: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday stuff topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching stuff:", error);
    res.status(500).json({ message: "Server error: Failed to fetch stuff" });
  }
};

module.exports = {
  addStuff,
  getStuff,
  getStuffById,
  deleteStuff,
  updateStuff,
  searchStuff,
};
