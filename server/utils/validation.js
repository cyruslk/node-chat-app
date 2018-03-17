var isRealString = (str) => {
  // Here, it will return true if its a string or false is its not (or the .length is 0);
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};
