const { ExpressValidator } = require("express-validator");
const { ranges } = require("../../constants/validation");

const { body } = new ExpressValidator();

const postValidator = [
  body("title").optional({ values: "falsy" }).trim().isLength(ranges.title)
    .withMessage(`
      Title is required to be between ${ranges.title.min} and ${ranges.title.max}.  
    `),
  body("text").trim().isLength(ranges.text).withMessage(`
    Message is required to be between ${ranges.text.min} and ${ranges.text.max}.
  `),
];

module.exports = postValidator;
