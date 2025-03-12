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

const filterValidColumns = (entityColumns, data) => {
  const dataColumns = Object.keys(data);
  const filteredColumns = dataColumns.map((column) => {
    if (!entityColumns.includes(column)) {
      return;
    }

    return column;
  });

  return filteredColumns;
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
    const validColumns = filterValidColumns(columns, data);
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

    const { rows } = await db.query(query, values);
    return rows[0];
  };

  const update = async (id, data) => {
    const validColumns = filterValidColumns(columns, data);
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

  return {
    findById,
    create,
    update,
  };
};

module.exports = createEntity;
