const roles = require('../config/roles'); // Ścieżka do pliku z rolami

// Middleware sprawdzający, czy użytkownik jest zalogowany
const authenticateUser = (req, res, next) => {
    console.log("Sesja użytkownika:", req.session?.user); // Loguj sesję dla debugowania
    if (req.session && req.session.user) {
      req.user = req.session.user; // Przypisz dane użytkownika do req.user
      next(); // Kontynuuj do endpointu
    } else {
      console.log("Nieautoryzowany dostęp. Brak sesji.");
      res.status(401).json({ success: false, message: "Musisz być zalogowany." });
    }
  };

// Middleware sprawdzający, czy użytkownik ma odpowiednie uprawnienia
const authorizePermission = (permission) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !roles[userRole]?.includes(permission)) {
      return res.status(403).json({ success: false, message: 'Brak uprawnień.' });
    }

    next();
  };
};

module.exports = { authenticateUser, authorizePermission };
