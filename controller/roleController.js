const MemberRolesModel = require("../Model/MemberRolesModel");

exports.createRoles = async (req, res) => {
  try {
    // console.log(req.body.positions);
    const roles = await MemberRolesModel.create({
      id: req.user._id,
      positions: req.body,
    });

    res.status(201).json(roles);
  } catch (error) {
    console.log("Erorr in create role controller", error.message);
    res.status(500).json("Error in create role controller");
  }
};

exports.getRoles = async (req, res) => {
  try {
    // console.log(req.body.positions);
    const roles = await MemberRolesModel.findOne({ id: req.user._id });

    res.status(201).json(roles);
  } catch (error) {
    console.log("Erorr in get role controller", error.message);
    res.status(500).json("Error in get role controller");
  }
};

exports.getRolesById = async (req, res) => {
  try {
    // console.log(req.params.id);

    const roles = await MemberRolesModel.findById(req.params.id);

    res.status(201).json(roles);
  } catch (error) {
    console.log("Erorr in get role by id controller", error.message);
    res.status(500).json("Error in get role by id controller");
  }
};

// ADMIN
exports.getRolesAdmin = async (req, res) => {
  try {
    // console.log(req.body.positions);
    const roles = await MemberRolesModel.findOne({ id: req.params.id });

    res.status(201).json(roles);
  } catch (error) {
    console.log("Erorr in get role controller", error.message);
    res.status(500).json("Error in get role controller");
  }
};
