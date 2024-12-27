const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "rezerwacja",
});

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