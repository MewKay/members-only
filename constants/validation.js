const ranges = {
  first_name: {
    min: 2,
    max: 30,
  },
  last_name: {
    min: 2,
    max: 30,
  },
  username: {
    min: 4,
    max: 15,
  },
  password: {
    min: 4,
    max: 255,
  },
  title: {
    min: 0,
    max: 50,
  },
  text: {
    min: 1,
    max: 280,
  },
};

const locale = "en-US";

module.exports = { ranges, locale };
