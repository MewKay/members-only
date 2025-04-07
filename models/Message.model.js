const db = require("../config/database");
const createEntity = require("./create-entity");

const Message = (function createMessageModel() {
  const entity = createEntity("messages");

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

  const findAllWithUsers = async () => {
    const query = `
      SELECT m.id, title, text, created_at, user_id, username, membership_status
      FROM messages m
      INNER JOIN users u 
        ON m.user_id = u.id;
    `;

    const { rows } = await db.query(query);
    return rows;
  };

  return {
    ...entity,
    findMessageUser,
    findAllWithUsers,
  };
})();

module.exports = Message;
