#! usr/bin/env node
const { Client } = require("pg");

const query = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(30),
    last_name VARCHAR(30) NOT NULL,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    membership_status BOOLEAN NOT NULL DEFAULT FALSE 
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50),
    text VARCHAR(280) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  );
`;

//Url can be passed as the first argument of the script
const DATABASE_URL = process.argv[2];

const main = async () => {
  console.log("seeding...");
  let client;

  try {
    client = new Client({
      connectionString: DATABASE_URL,
    });

    await client.connect();
    await client.query(query);

    console.log("done");
  } catch (e) {
    console.error(e);
  } finally {
    if (client) await client.end();
  }
};

main();
