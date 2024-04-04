const authService = require("../services/authService");
const { User, Contact, SpamReport } = require("../Models");

const register = async (req, res) => {
  try {
    const userData = req.body; //input
    const user = await authService.registerUser(userData); //processing
    console.log("User:",user)
    res.status(201).json({
      message: "User registered successfully",
      userId: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;

    const { token, userId } = await authService.loginUser(userData);

    res.status(200).json({
      message: "User logged in successfully",
      token,
      userId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchByName = async (req, res) => {
    try {
      const name = req.params.name;
      const results =  await User.findAll({
        attributes: ["name", "PhoneNumber"],
        where: {
          name: {
            [Op.iLike]: name + "%",
          },
        },
      });
      res.json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const searchByPhoneNumber = async (req, res) => {
    try {
      const phoneNumber = req.params.phoneNumber;
      const results = await User.findAll({
        where: { phoneNumber },
        include: [{ model: SpamReport, attributes: ["phoneNumber"] }],
      });
      res.json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = { register, login ,searchByPhoneNumber,searchByName};
