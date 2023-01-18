const express = require("express");
const { addItem, getAllItems, updateItem, deleteItem } = require("../controllers/itemControllers");
const router = express.Router();
const itemModel = require("../models/todoItems");

//post new item todo List
router.post("/api/item",addItem);

//to get all items in the list:
router.get("/api/items",getAllItems);

//update an item by its id
router.put("/api/item/:id", updateItem);

//delete  single item
router.delete('/api/item/:id',deleteItem)

module.exports = router;
