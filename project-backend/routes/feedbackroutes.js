const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const feedbackModel = require("../models/feedbackmodel");
router.get("/get", async (req, res) => {
    try {
        const data = await feedbackModel.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Cannot fetch data");
    }
});

router.post("/add", async (req, res) => {
    try {
        const newform = new feedbackModel(req.body);
        await newform.save();
        res.status(200).send({ message: "Feedback added successfully" });
    } catch (error) {
        res.status(500).send("Error ");
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        await feedbackModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: "Feedback updated successfully" });
    } catch (error) {
        res.status(500).send("Updation Error");
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deleted = await feedbackModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).send("Feeback not found");

        res.status(200).send({ message: "Feedback data deleted successfully" });
    } catch (error) {
        res.status(500).send("Error deleting");
    }
});

module.exports = router;
