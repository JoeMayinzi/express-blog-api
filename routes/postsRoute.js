const express = require("express");
const router = express.Router();

const posts = [
  {
    id: 1,
    title: "Mon Premier Article",
    content:
      "Voici le contenu de mon premier article sur le blog. Il parle de la technologie et de son évolution.",
    author: "Joe Mayinzi",
    category: "Technologie",
    tags: ["innovation", "évolution", "numérique"],
    imageUrl: "https://example.com/image.jpg",
    published: true,
  },
  {
    id: 2,
    title: "L'impact de l'IA sur le marché du travail",
    content:
      "Cet article explore comment l'intelligence artificielle transforme le monde du travail.",
    author: "Joe Mayinzi",
    category: "Technologie",
    tags: ["IA", "travail", "innovation"],
    imageUrl: "https://example.com/ai-impact.jpg",
    published: true,
  },
  {
    id: 3,
    title: "Les réseaux sociaux et l'engagement des utilisateurs",
    content:
      "Une analyse approfondie sur l'importance des réseaux sociaux pour les marques et les utilisateurs.",
    author: "Joe Mayinzi",
    category: "Marketing Digital",
    tags: ["réseaux sociaux", "engagement", "marketing"],
    imageUrl: "https://example.com/social-media.jpg",
    published: true,
  },
  {
    id: 4,
    title: "Comprendre le SEO en 2025",
    content:
      "Un guide sur les pratiques SEO les plus efficaces pour l'année 2025.",
    author: "Joe Mayinzi",
    category: "SEO",
    tags: ["SEO", "référencement", "marketing digital"],
    imageUrl: "https://example.com/seo-guide.jpg",
    published: true,
  },
  {
    id: 5,
    title: "La montée du commerce en ligne",
    content:
      "L'essor du e-commerce et comment les petites entreprises peuvent tirer profit de cette tendance.",
    author: "Joe Mayinzi",
    category: "E-commerce",
    tags: ["e-commerce", "entreprises", "tendances"],
    imageUrl: "https://example.com/e-commerce.jpg",
    published: true,
  },
  {
    id: 6,
    title: "Le futur du développement web",
    content:
      "Une réflexion sur l'avenir du développement web et les nouvelles technologies à surveiller.",
    author: "Joe Mayinzi",
    category: "Développement Web",
    tags: ["web", "technologies", "développement"],
    imageUrl: "https://example.com/web-development.jpg",
    published: true,
  },
  {
    id: 7,
    title: "Comment réussir sa stratégie sur Instagram",
    content:
      "Un article détaillant les meilleures pratiques pour réussir sur Instagram en tant que marque.",
    author: "Joe Mayinzi",
    category: "Marketing Digital",
    tags: ["Instagram", "stratégie", "réseaux sociaux"],
    imageUrl: "https://example.com/instagram-strategy.jpg",
    published: true,
  },
  {
    id: 8,
    title: "L'évolution des interfaces utilisateur",
    content:
      "Exploration des dernières tendances en matière de design d'interface utilisateur et d'expérience utilisateur.",
    author: "Joe Mayinzi",
    category: "Design",
    tags: ["UX/UI", "design", "tendances"],
    imageUrl: "https://example.com/ui-design.jpg",
    published: true,
  },
  {
    id: 9,
    title: "Les bases du marketing par e-mail",
    content:
      "Un guide complet pour comprendre les principes du marketing par e-mail et comment l'appliquer efficacement.",
    author: "Joe Mayinzi",
    category: "Marketing Digital",
    tags: ["email", "marketing", "stratégies"],
    imageUrl: "https://example.com/email-marketing.jpg",
    published: true,
  },
  {
    id: 10,
    title: "Les meilleures pratiques en gestion de projet digital",
    content:
      "Cet article vous donne des conseils pour réussir la gestion de projets digitaux en entreprise.",
    author: "Joe Mayinzi",
    category: "Gestion de Projet",
    tags: ["gestion de projet", "digital", "entreprise"],
    imageUrl: "https://example.com/project-management.jpg",
    published: true,
  },
];

// Route pour récupérer tous les articles du blog
router.get("/posts", (request, response) => {
  response.status(200).json(posts);
});

router.post("/posts", (request, response) => {
  const { title, content, author, category, tags, imageUrl, published } =
    request.body;

  // Vérification simple des données (optionnel mais recommandé)
  if (!title || !content || !author) {
    return response
      .status(400)
      .json({ message: "Title, content and author are required" });
  }

  // Simuler l'enregistrement de l'article (ici on renvoie juste les données reçues)
  const newArticle = {
    title,
    content,
    author,
    category: category || "Autre", // Valeur par défaut si pas de catégorie fournie
    tags: tags || [],
    imageUrl: imageUrl || "",
    published: published !== undefined ? published : true, // Par défaut publié
  };

  // Retourner la réponse avec l'article créé
  response.status(201).json({
    message: "Article created successfully",
    article: newArticle,
  });
});

router.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, author, category, tags, imageUrl, published } =
    req.body;

  // Trouver l'article avec l'ID correspondant
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Article non trouvé." });
  }

  // Mettre à jour l'article
  posts[postIndex] = {
    id,
    title: title || posts[postIndex].title,
    content: content || posts[postIndex].content,
    author: author || posts[postIndex].author,
    category: category || posts[postIndex].category,
    tags: tags || posts[postIndex].tags,
    imageUrl: imageUrl || posts[postIndex].imageUrl,
    published: published !== undefined ? published : posts[postIndex].published,
  };

  // Retourner la réponse avec l'article mis à jour
  return res.status(200).json(posts[postIndex]);
});

router.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  // Convertir l'ID en nombre
  const postId = parseInt(id, 10);

  // Trouver l'index de l'article à supprimer
  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Article non trouvé." });
  }

  // Supprimer l'article du tableau
  posts.splice(postIndex, 1);

  // Retourner une réponse indiquant que l'article a été supprimé
  return res.status(200).json({ message: "Article supprimé avec succès." });
});

module.exports = router;
