# Checkpoint frontend

Pour ce checkpoint, tu devras implémenter la partie front-end d'un blog sur le développement Web. 
Tu partiras d'un squelette NextJS presque vide; toute la partie backend est déjà fournie.

## Setup

- Fait un fork de ce repository et clone-le sur ta machine.
- Va dans le dossier backend, installe les dépendances et mets en place les variables d'environnement.
- Va dans le dossier frontend, installe les dépendances et mets en place les variables d'environnement.
- Va à la racine du repository et fais un ```docker compose up```
- Va dans le dossier backend et fais un  ```npm run resetDB``` pour avoir des données sur lesquelles travailler.
- Va explorer l'API graphQL (par défault sur [http://localhost:4000](http://localhost:4000)) pour voir comment l'exploiter sur le front.

## Fonctionnalités à intégrer sur le front

- Sur la page d'accueil, on peut voir les 5 derniers articles du blog (titre, image principale).
- Chaque article possède une page détails où toutes les infos sont affichées (titre, catégorie, date de création/mise à jour, image principale, corps de l'article).
- On peut créer un nouvel article sur une page dédiée. Après la création, on est redirigé vers la page détails de l'article créé.
- On peut supprimer un article (avec confirmation) avec un bouton sur sa page détails.
- On peut rechercher les articles par titre

Tu peux regarder le dossier "screenshots" à la racine pour avoir une idée de ce qui est attendu pour chaque page.
Ces captures d'écran sont présentes à titre informatifs uniquement, tu peux tout à fait chosir une autre façon de présenter les éléments sur tes pages.

Quelques conseils :
- développe en mobile-first
- priorise les fonctionnalités plutot que le style
- utilise des outils comme [WAVE](https://wave.webaim.org/) pour vérifier l'accessibilité de tes pages.
