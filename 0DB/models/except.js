const except = () => {
  return { exclude: ["itemOrderCustomerId", "itemId", "optionId"] };
};

module.exports = {
  except,
};
