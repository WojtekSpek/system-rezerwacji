const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password:process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_NAME,
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