const db = require("../config/database");
const { getColumns, filterValidColumns } = require("../utils/db.util");

const entityColumnsList = {};

const getTableColumns = async (tablename) => {
  let tableColumns = entityColumnsList[tablename];

  if (!tableColumns) {
    tableColumns = await getColumns(tablename);
    entityColumnsList[tablename] = tableColumns;
  }

  return tableColumns;
};

const createEntity = function entityFactory(tablename) {
  const findBy = async (filters = {}) => {
    const entityColumns = await getTableColumns(tablename);
    let query;
    let values = [];

    if (Object.keys(filters).length <= 0) {
      query = `
        SELECT *
        FROM ${tablename};
      `;
    } else {
      const validColumns = filterValidColumns(entityColumns, filters);

      if (validColumns.length <= 0) {
        return [];
      }

      const clauses = validColumns
        .map((column, index) => {
          const columnDataType = entityColumns[column];

          // For simplicity sake, data can only be queried by date regardless of time
          if (columnDataType.includes("timestamp with time zone")) {
            values.push(filters[column]);
            return `${column}::date = $${index + 1}`;
          }

          if (!columnDataType.includes("character")) {
            values.push(filters[column]);
            return `${column} = $${index + 1}`;
          }

          values.push(`%${filters[column]}%`);
          return `${column} ILIKE $${index + 1}`;
        })
        .join(" AND ");

      query = `
        SELECT *
        FROM ${tablename}
        WHERE ${clauses};
      `;
    }

    const { rows } = await db.query(query, values);
    return rows;
  };

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
    const entityColumns = await getTableColumns(tablename);
    const validColumns = filterValidColumns(entityColumns, data);

    if (validColumns.length <= 0) {
      return null;
    }

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
    const entityColumns = await getTableColumns(tablename);
    const validColumns = filterValidColumns(entityColumns, data);

    if (validColumns.length <= 0) {
      return null;
    }

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
    findBy,
    findById,
    create,
    update,
    remove,
  };
};

module.exports = createEntity;
