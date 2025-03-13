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

    const columns = {};
    rows.forEach(
      ({ column_name, data_type }) => (columns[column_name] = data_type),
    );

    return columns;
  } catch (error) {
    console.error(error.stack);
  }
};

const filterValidColumns = (entityColumns, data) => {
  const dataColumns = Object.keys(data);
  const filteredColumns = dataColumns.filter((column) => {
    const isColumnOfEntity = entityColumns[column] !== undefined;
    return isColumnOfEntity;
  });

  return filteredColumns;
};

module.exports = {
  getColumns,
  filterValidColumns,
};
