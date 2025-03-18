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
};

const locale = "en-US";

module.exports = { ranges, locale };
