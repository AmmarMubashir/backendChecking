const Startup = require("../Model/StartupModel");

exports.uploadStartup = async (req, res) => {
  try {
    const { name, location } = req.body;

    const startup = new Startup({
      id: req.user._id,
      name,
      location,
    });

    // console.log(req.user);
    if (startup) {
      await startup.save();
    } else {
      return res.status(400).json({ message: "Error saving the startup data" });
    }

    return res.status(201).json({
      data: startup,
      message: "Startup data uploaded successfully",
    });
  } catch (error) {
    console.log("Error in Startup uploading", error.message);
    res.status(500).json({ message: "Error uploading the startup data" });
  }
};

exports.getStartup = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const startup = await Startup.findById(id);

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    return res.status(201).json({
      data: startup,
      message: "Startup data shown successfully",
    });
  } catch (error) {
    console.log("Error in startup uploading", error.message);
    res.status(500).json({ message: "Error in getting the startup data" });
  }
};

exports.getIndividualStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({ id: req.user._id });

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    return res.status(201).json({
      data: startup,
      message: "Startup data shown successfully",
    });
  } catch (error) {
    console.log("Error in getting startup", error.message);
    res.status(500).json({ message: "Error in getting the startup data" });
  }
};
