const express = require("express")
const router = express.Router()
const {registerUser, loginUser, getMe, loginGoogle} = require("../controllers/userController")
const {protect} = require("../middleware/authMiddleware")

router.post("/", registerUser)
router.post("/login", loginUser)
router.post("/loginGoogle", loginGoogle)
router.get("/me", protect, getMe)

module.exports = router