const except = () => {
  return { exclude: ["itemOrderCustomerId", "itemId"] };
};

module.exports = {
  except,
};
