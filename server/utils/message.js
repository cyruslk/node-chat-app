var generateMessage = (from, text) => {
  return{
    from,
    text,
    createdAt: new Date().geTime()
  };
};


module.exports = {generateMessage};
