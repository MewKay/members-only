const db = require("../db/index");
const createEntity = require("./create-entity");

const createUser = async function createUserModel() {
  const entity = await createEntity("users");

  const findUserMessages = async (id) => {
    const query = `
      SELECT *
      FROM users u
      INNER JOIN messages m
        ON u.id = m.user_id
      WHERE u.id = $1;
    `;
    const values = [id];

    const { rows } = await db.query(query, values);
    return rows;
  };

  return {
    ...entity,
    findUserMessages,
  };
};

module.exports = createUser;
