require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// 🔥 Middlewares de base
app.use(express.json()); // Pour parser le JSON
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(helmet()); // Sécuriser Express avec des headers HTTP
app.use(morgan("dev")); // Logger les requêtes

const postsRoute = require("./routes/postsRoute");

// 🔗 Route de test
app.use("/api/blog", postsRoute);

// 🎯 Lancement du serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
);
