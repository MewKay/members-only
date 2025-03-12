const db = require("../db/index");
const { getColumns, filterValidColumns } = require("../utils/db.util");

const createEntity = async function entityFactory(tablename) {
  const entityColumns = await getColumns(tablename);
  const columnNames = entityColumns.map((row) => row.column_name);

  const findById = async (id) => {
    const query = `
      SELECT *
      FROM ${tablename}
      WHERE id = $1;
    `;
    const values = [id];

    const { rows } = await db.query(query, values);
    return rows[0] || null;
  };

  const create = async (data) => {
    const validColumns = filterValidColumns(columnNames, data);
    const validColumnNames = validColumns.join(", ");

    let paramList = [];
    const values = validColumns.map((column, index) => {
      paramList.push(`$${index + 1}`);
      return data[column];
    });
    const params = paramList.join(", ");

    const query = `
      INSERT INTO ${tablename} 
        (${validColumnNames})
      VALUES
        (${params})
      RETURNING *;
    `;

    const { rows } = await db.query(query, values);
    return rows[0];
  };

  const update = async (id, data) => {
    const validColumns = filterValidColumns(columnNames, data);
    const updatedColumns = validColumns
      .map((column, index) => {
        return `${column} = $${index + 2}`;
      })
      .join(", ");
    const params = validColumns.map((column) => data[column]);

    const query = `
      UPDATE ${tablename}
      SET ${updatedColumns}
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id, ...params];

    const { rows } = await db.query(query, values);
    return rows[0] || null;
  };

  const remove = async (id) => {
    const query = `
      DELETE FROM ${tablename}
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];

    const { rows } = await db.query(query, values);
    return rows[0];
  };

  return {
    findById,
    create,
    update,
    remove,
  };
};

module.exports = createEntity;
