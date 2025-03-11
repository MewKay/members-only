const db = require("../db/index");

const getColumns = async (tablename) => {
  try {
    const columnQuery = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = '${tablename}';
    `;
    const { rows } = await db.query(columnQuery);

    if (rows.length <= 0) {
      throw new Error(`"${tablename}" is not a valid table`);
    }

    const columnNames = rows.map((row) => row.column_name);
    return columnNames.sort();
  } catch (error) {
    console.error(error.stack);
  }
};

const createEntity = async function entityFactory(tablename) {
  const columns = await getColumns(tablename);

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
    const validColumns = Object.keys(data).map((column) => {
      if (!columns.includes(column)) {
        return;
      }

      return column;
    });
    const columnNames = validColumns.join(", ");

    let paramList = [];
    const values = validColumns.map((column, index) => {
      paramList.push(`$${index + 1}`);
      return data[column];
    });
    const params = paramList.join(", ");

    const query = `
      INSERT INTO ${tablename} 
        (${columnNames})
      VALUES
        (${params})
      RETURNING *;
    `;
    console.log(query);

    const { rows } = await db.query(query, values);
    return rows[0];
  };

  return {
    findById,
    create,
  };
};

module.exports = createEntity;
