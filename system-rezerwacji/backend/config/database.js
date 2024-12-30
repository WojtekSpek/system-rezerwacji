require('dotenv').config(); // Ładowanie zmiennych środowiskowych
const mysql = require("mysql2");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
}); 

/* const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "rezerwacja",
}); */

module.exports = db;


/* const mysql = require("mysql2");

const db = mysql.createPool({
  host: "serwer1523088.home.pl", // Adres hosta
  port: 3380,                    // Port serwera MySQL
  user: "18805385_szkolenia",    // Nazwa użytkownika
  password: "_i_hYQv8",          // Hasło użytkownika
  database: "18805385_szkolenia" // Nazwa bazy danych
});

module.exports = db;
 */