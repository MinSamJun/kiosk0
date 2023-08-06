//  2service/Option.Service.js

const OptionRepositories = require("../3repository/Option.Repository.js");

require("dotenv").config();
const env = process.env;

class OptionServices {
  optionRepositories = new OptionRepositories();

  optionCreateService = async (
    passwrod,
    option_name,
    extra_price,
    shot_price,
    hot_price
  ) => {
    try {
      if (passwrod !== env.Admin_Pass) {
        return {
          status: 400,
          message: "비밀번호를 확인해주세요",
        };
      } else if (!option_name) {
        return {
          status: 400,
          message: "옵션의 이름을 입력하여 주세요.",
        };
      }

      const addOption = await this.optionRepositories.optionCreateRepository(
        option_name,
        extra_price,
        shot_price,
        hot_price
      );

      if (addOption !== null) {
        return { status: 200, message: "옵션 등록에 성공했습니다." };
      }
    } catch (err) {
      return { status: 400, message: err.message };
    }
  };
}

module.exports = OptionServices;
