import User from "./models/User.js";

export default class AuthMongo {
  constructor() {}
  async register(data) {
    let one = await User.create(data);
    return {
      message: "user registered",
      response: one._id,
    };
  }
  login() {
    return {
      message: "user logged in",
      response: true,
    };
  }
  signout() {
    return {
      message: "user signed out",
      response: true,
    };
  }
  readOne(mail) {
    let one = User.findOne({ mail });
    if (one) {
      return one;
    } else {
      return null;
    }
  }
  readById(id) {
    let one = User.findById(id);
    if (one) {
      return one;
    } else {
      return null;
    }
  }
}
