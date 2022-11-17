import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

export const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: '192.168.62.36',
  requestTimeout: 60000000,
  pool: {
    max: 160, //numero maximo de conexiones disponibles en el poll
    min: 0,
    idleTimeoutMillis: 6000000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
    requestTimeout: 6000000,
  },
};

// Execute a query on the database.
export const executeQueryD = async (query) => {
  const pool = new sql.ConnectionPool(config);
  pool.on('error', (error) => error);

  try {
    await pool.connect();

    let result = pool.request();

    result = await result.query(query);
  } catch (error) {
    return error;
  } finally {
    pool.close();
  }
};

// Execute a query on the database.
export const executeQuery = async (query, input = {}) => {
  const pool = new sql.ConnectionPool(config);
  pool.on('error', (error) => error);

  try {
    await pool.connect();

    let result = pool.request();

    for (let key in input) {
      if (Array.isArray(input[key])) {
        // input(field_name, dataType, value)
        result = result.input(key, input[key][1], input[key][0]);
      } else {
        // input(field_name, value)
        result = result.input(key, input[key]);
      }
    }

    result = await result.query(query);

    return result;
  } catch (error) {
    return error;
  } finally {
    pool.close();
  }
};

// Execute a store procedure on the database.
export const executeProcedure = async (procedure, input = {}) => {
  const pool = new sql.ConnectionPool(config);
  pool.on('error', (error) => error);

  try {
    await pool.connect();

    let result = pool.request();

    for (let key in input) {
      if (Array.isArray(input[key])) {
        // input(field_name, dataType, value)
        result = result.input(key, input[key][1], input[key][0]);
      } else {
        // input(field_name, value)
        result = result.input(key, input[key]);
      }
    }

    result = await result.execute(procedure);
    pool.close();
    return result;
  } catch (error) {
    return error;
  } finally {
    pool.close();
  }
};
