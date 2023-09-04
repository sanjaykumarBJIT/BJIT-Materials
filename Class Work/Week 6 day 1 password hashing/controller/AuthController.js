const { validationResult } = require("express-validator");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const UserModel = require("../model/user");
const AuthModel = require("../model/Auth");
const mongoose = require("mongoose");
const Auth = require("../model/Auth");

const bcrypt = require("bcrypt");

class AuthController {
  async login(req, res) {
    try {
      const Validation = validationResult(req).array();
      console.log(Validation);
      if (Validation.length > 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }

      const { email, password } = req.body;
      console.log(email, password);

      const auth = await Auth.findOne({ email: email }).populate("user");
      console.log(",,,,,,,,,,", auth);

      //   console.log(auth.p);

      if (!auth) {
        return res.status(200).send(failure("User is not registered"));
      }

      const checkPassword = await bcrypt.compare(password, auth.password);

      if (!checkPassword) {
        return res.status(200).send(failure("Invalid credentials"));
      }

      const modifiedData = {
        email: auth.email,
        user: auth.user,
      };

      return res.status(200).send(success("Success", modifiedData));
    } catch (error) {
      console.log("Errorrrrrrrrrrrrr", error);
      return res.status(500).send(success("Server Error"));
    }
  }

  async signup(req, res) {
    try {
      const Validation = validationResult(req).array();
      console.log(Validation);
      if (Validation.length > 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }
      

      const { email, password, name, age, userName } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10).then((hash) => {
        return hash;
      });

      console.log(hashedPassword);
      if (hashedPassword) {
        const newUser = await UserModel.create({
          email,
          age,
          name,
          userName,
        });

        if (newUser) {
          const newAuthUser = await AuthModel.create({
            email,
            password: hashedPassword,
            user: newUser._id,
          });
          if (newAuthUser) {
            return res.status(200).send(success("Successfully created new User"));
          }
        }
        
        return res.status(400).send(success("could not create new User"));
      }
      //   return res.status(200).send(success("Success"));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Internal Server Error"));
    }
  }
}

module.exports = new AuthController();
