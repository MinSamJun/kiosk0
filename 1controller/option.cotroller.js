// 1controller.itemsController.js

const OptionServices = require("../2service/Option.Service.js");

class OptionControllers {
  optionServices = new OptionServices();
  optionCreateController = async (req, res) => {
    const { passwrod, option_name, extra_price, shot_price, hot_price } =
      req.body;
    const { status, message } = await this.optionServices.optionCreateService(
      passwrod,
      option_name,
      extra_price,
      shot_price,
      hot_price
    );
    return res.status(status).json({ message });
  };
}

module.exports = OptionControllers;
