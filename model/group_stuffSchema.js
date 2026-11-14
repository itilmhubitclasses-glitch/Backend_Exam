const { Schema, model } = require("mongoose");
const { Group } = require("./groupSchema");
const { Stuff } = require("./stuffSchema");

const group_stuffSchema = new Schema({
  group_id: { type: Schema.Types.ObjectId, ref: Group, default: null },
  stuff_id: { type: Schema.Types.ObjectId, ref: Stuff, default: null },
});

const Group_stuff = model("group_stuff", group_stuffSchema);
module.exports = { Group_stuff };
