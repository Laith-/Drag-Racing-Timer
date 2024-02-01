const express = require("express")
const router = express.Router()
const { getInventory,
        addInventory,
        updateInventory,
        deleteInventory,
        getPublicInventory
        } = require("../controllers/inventoryController")
const {protect} = require("../middleware/authMiddleware")


// Public route
router.get("/getPublicInventory/:id?", getPublicInventory);

// Private routes
router.route("/:id?").get(protect, getInventory).post(protect, addInventory);
router.route("/:id").put(protect, updateInventory).delete(protect, deleteInventory);


module.exports = router