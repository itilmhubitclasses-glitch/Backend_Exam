const { Group_stuff } = require("../model/Group_stuffSchema");

// add group_stuff
const addGroup_stuff = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;
    const existingGroup_stuff = await Group_stuff.findOne({ group_id, stuff_id });
    console.log(existingGroup_stuff);

    if (existingGroup_stuff) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan Group_stuff mavjud.",
      });
    } else {
      const newGroup_stuff = new Group_stuff({
        group_id,
        stuff_id,
      });

      await newGroup_stuff.save();

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

// get Group_stuff
const getGroup_stuff = async (req, res) => {
  try {
    const group_stuff = await Group_stuff.find({});
    res.json({
      success: true,
      message: "Barcha group_stufflar royhati olingan",
      innerData: group_stuff,
    });
  } catch (error) {
    console.error("Error fetching group_stuff:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: group_stuff olishda xato yuz berdi.",
    });
  }
};

// get Group_stuff by id
const getGroup_stuffById = async (req, res) => {
  try {
    const group_stuffId = req.params.id;

    const group_stuff = await Group_stuff.findById(group_stuffId);
    if (!group_stuff) {
      return res.status(404).json({ message: "Group_stuff not found" });
    }

    res.json({ message: "Group_stuff found", group_stuff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update Group_stuff by id
const updateGroup_stuff = async (req, res) => {
  try {
    const { id } = req.params;
    const {group_id, stuff_id} = req.body;
    const updateGroup_stuff = await Group_stuff.findByIdAndUpdate(
      id,
      { group_id, stuff_id },
      { new: true },
    );
    if (!updateGroup_stuff) {
      return res.status(404).json({
        success: true,
        message: "group_stuff not found",
      });
    }
    res.json({
      success: true,
      message: "group_stuff update sucessfully!",
      user: updateGroup_stuff,
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

// delete Group_stuff by id
const deleteGroup_stuff = async (req, res) => {
  try {
    const group_stuffId = req.params.id;

    const group_stuff = await Group_stuff.findByIdAndDelete(group_stuffId);

    res.json({
      message: "Group_stuff deleted succesfully",
      group_stuff,
    });

    if (!group_stuff) {
      return res.status(404).json({
        message: "Group_stuff not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports ={
    addGroup_stuff,
    getGroup_stuff,
    getGroup_stuffById,
    updateGroup_stuff,
    deleteGroup_stuff
}