import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CreateError from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    const data=await newUser.save();
    const { password, ...others } = data._doc;
    res.status(200).send(others);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user){
        throw new CreateError(404, "User not found");
    }
    console.log(user);
    console.log(req.body);
    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect){
        throw new CreateError(401, "Incorrect Password");
    }
    // will add this to a new class and import here
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;
    console.log(token);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

