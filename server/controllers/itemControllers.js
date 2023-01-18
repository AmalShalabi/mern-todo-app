const itemModel = require("../models/todoItems");
const addItem = async (req, res) => {
  try {
    const newItem = await new itemModel({
      item: req.body.item,
    });
    newItem.save();
    res.json(newItem);
  } catch (err) {
    res.json(err);
  }
};

const getAllItems= async (req, res) => {
  try {
    const alliItems = await itemModel.find({});
    res.status(200).json(alliItems);
  } catch (err) {
    res.json(err);
  }
};

const updateItem= async (req, res) => {
  try {
    const updateItem = await itemModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("updated");
  } catch (err) {
    res.json(err);
  }
};

const deleteItem= async (req, res) => {
  try {
    const deleteItem = await itemModel.findOneAndDelete(req.params.id);
    res.status(200).json("has been deleted successfully");
  } catch (err) {
    res.json(err);
  }
};



module.exports={addItem,getAllItems,updateItem,deleteItem}