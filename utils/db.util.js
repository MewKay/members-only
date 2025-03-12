const db = require("../db/index");

const getColumns = async (tablename) => {
  try {
    const columnQuery = `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = '${tablename}';
    `;
    const { rows } = await db.query(columnQuery);

    if (rows.length <= 0) {
      throw new Error(`"${tablename}" is not a valid table`);
    }

    return rows;
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

module.exports = {
  getColumns,
  filterValidColumns,
};
