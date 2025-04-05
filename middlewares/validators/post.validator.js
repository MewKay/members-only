const { ExpressValidator } = require("express-validator");
const { ranges } = require("../../constants/validation");

const { body } = new ExpressValidator();

const postValidator = [
  body("title").optional({ values: "falsy" }).trim().isLength(ranges.title)
    .withMessage(`
      Title can not be more than ${ranges.title.max} characters.  
    `),
  body("text").trim().isLength(ranges.text).withMessage(`
    Message is required to be between ${ranges.text.min} and ${ranges.text.max} characters.
  `),
];

module.exports = postValidator;
