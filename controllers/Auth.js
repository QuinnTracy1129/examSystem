const Entity = require("../models/Users"),
  generateToken = require("../config/generateToken"),
  fs = require("fs");

exports.login = (req, res) => {
  const { email, password } = req.query;

  Entity.findOne({ email })
    .select("-createdAt -updatedAt -__v")
    .populate("role")
    .then(async item => {
      if (!item)
        return res.status(404).json({
          error: "User Not Found",
          message: "The provided Credentials does not exist.",
        });

      if (!item.isActive)
        return res.status(400).json({
          error: "Account Deactivated",
          message: "Contact the Admnistrator",
        });

      if (!(await item.matchPassword(password)))
        return res.status(400).json({
          error: "Invalid Credentials",
          message: "The provided Credentials does not match.",
        });

      res.json({
        success: "Login Success",
        payload: {
          user: {
            ...item._doc,
            password: undefined,
          },
          token: generateToken({ _id: item._id }),
        },
      });
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.provideAuth = async (_, res) =>
  res.json({
    success: "Validatation Success",
    payload: res.locals.caller,
  });

exports.upload = (req, res) => {
  const { path, base64, name } = req.body;
  const url = `./assets/${path}`;
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url, { recursive: true });
  }
  try {
    fs.writeFileSync(`${url}/${name}`, base64, "base64");
    return res.json({ message: "File Uploaded Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
