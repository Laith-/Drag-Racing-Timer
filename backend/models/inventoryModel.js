const mongoose = require("mongoose")

const inventorySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectID,
            required: [true],
            ref: "User"
        },
        published: {
            type: Boolean,
            required: [false]
        },
        vin: {
            type: String,
            required: [false, "Please add a VIN number"]
        },
        year: {
            type: String,
            required: [true, "Please add a model year"]
        },
        make: {
            type: String,
            required: [true, "Please add a vehicle make"]
        },
        model: {
            type: String,
            required: [true, "Please add a vehicle model"]
        },
        trim: {
            type: String,
            required: [false, "Please add a vehicle trim"]
        },
        color: {
            type: String,
            required: [false] // set to false for development. ***only applies to gas vehicles
        },
        transmission: {
            type: String,
            required: [false] // set to false for development
        },
        driveTrain: {
            type: String,
            required: [false] // set to false for development
        }
    },
    {
        timestamps: true,
        collection: process.env.INVENTORY_DB_NAME
    })

    module.exports = mongoose.model("Inventory", inventorySchema)