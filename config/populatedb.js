#! usr/bin/env node
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

const generateQuery = async () => {
  const SALT = 10;
  const rawPasswords = [
    "user1pass",
    "secret123",
    "p@ssw0rd",
    "testpass",
    "demo1234",
  ];
  const passwords = [];

  for (let password of rawPasswords) {
    const hashedPassword = await bcrypt.hash(password, SALT);
    passwords.push(hashedPassword);
  }

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
  
    INSERT INTO users 
      (first_name, last_name, username, password) 
    VALUES
      ('Alice', 'Johnson', 'alicej', '${passwords[0]}'),
      ('Bob', 'Williams', 'bobw', '${passwords[1]}'),
      ('Charlie', 'Brown', 'charlieb', '${passwords[2]}'),
      ('Diana', 'Miller', 'dianam', '${passwords[3]}'),
      ('Eve', 'Davis', 'eved', '${passwords[4]}');
  
    INSERT INTO messages
      (title, text, user_id, created_at) 
    VALUES
      ('Hello World', 'Just setting up my account!', 1, '2025-03-21 19:15:00+00'),
      ('Lunch Plans?', 'Anyone want to grab lunch later?', 3, '2025-03-22 11:45:00+00'),
      ('Important Update', 'System maintenance scheduled for Friday', 4, '2025-04-01 16:00:00+00'),
      ('Weekend Plans', 'Hiking trip this Saturday, who''s in?', 5, '2025-04-05 18:20:00+00'),
      ('New Project', 'Kickoff meeting moved to Monday', 1, '2025-04-08 10:00:00+00'),
      ('Book Recommendation', 'Just finished "The Silent Patient" - highly recommend!', 4, '2025-04-08 15:45:00+00');
  `;

  return query;
};

//Url can be passed as the first argument of the script
const DATABASE_URL = process.argv[2];

const main = async () => {
  console.log("seeding...");
  let client;
  const query = await generateQuery();

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
