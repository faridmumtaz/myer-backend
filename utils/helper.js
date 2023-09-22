const getMonth = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
};

const getTime = (date) => {
  return `${date.getHours()}:${date.getMinutes()}`;
};

module.exports = {
  getMonth,
  getTime,
};
