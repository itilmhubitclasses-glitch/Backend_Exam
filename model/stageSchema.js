const { Schema, model } = require("mongoose");

const stageSchema = new Schema({
    names: { type: String, required: true, trim: true},
});

const Stage = model("stage", stageSchema);
module.exports = {Stage};