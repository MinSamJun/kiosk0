//  3repository/Option.Repository.js

const Option = require("../0DB/models/option");

class OptionRepositories {
  optionCreateRepository = async (
    option_name,
    extra_price,
    shot_price,
    hot_price
  ) => {
    const isExist = await Option.findOne({
      where: {
        option_name: option_name,
      },
      // 가져올 컬럼을 명시적으로 지정
      attributes: ["option_name"],
    });
    if (isExist) {
      throw { message: "이미 존재하는 옵션입니다." };
    } else {
      const addItem = await Option.create({
        option_name,
        extra_price,
        shot_price,
        hot_price,
      });
      return addItem;
    }
  };
}

module.exports = OptionRepositories;
