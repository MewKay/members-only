const db = require("../config/database");
const createEntity = require("./create-entity");

const Message = (async function createMessageModel() {
  const entity = await createEntity("messages");

  const findMessageUser = async (id) => {
    const query = `
      SELECT *
      FROM messages m
      INNER JOIN users u
        ON m.user_id = u.id
      WHERE m.id = $1;
    `;
    const values = [id];

    const { rows } = await db.query(query, values);
    return rows[0];
  };

  return {
    ...entity,
    findMessageUser,
  };
})();

module.exports = Message;
