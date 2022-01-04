# Billed

> Neuvième projet du parcours _développeur front-end_ chez OpenClassrooms.

## Contexte

_Billed_ est une entreprise qui produit des solutions SaaS (_Software as a Service_) destinées aux équipes de ressources humaines.

Suite au départ d'une collègue de la _feature team_ **note de frais** de l'entreprise avant d'avoir terminé l'application, vous avez été designé par le _lead developer_ pour terminer le travail et tenir les délais.

Le gros du travail consiste à améliorer et fiabiliser le parcours employé, notamment en corrigeant les bugs identifiés, en ajoutant des tests unitaires et en rédigeant un plan de test _End-to-End_.

## Eléments fournis

- Le **code du [_back-end_](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-back)** ainsi que du **[_front-end_](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front)** de l'application, et les instructions nécessaires à son bon fonctionnement ;
- La **[description des fonctionnalités](https://course.oc-static.com/projects/DA+JSR_P9/Billed+-+Description+des+fonctionnalite%CC%81s.pdf)** de l'application, et la **[description pratique des besoins](https://course.oc-static.com/projects/DA+JSR_P9/Billed+-+Description+pratique+des+besoins+.pdf)** détaillant la liste des travaux nécessaires à sa finalisation ;
- Un [**exemple de plan de test _End-to-End_**](https://course.oc-static.com/projects/DA+JSR_P9/Billed+-+E2E+parcours+administrateur.docx) devant servir de modèle.

## Cahier des charges

- **Lien vers le code à jour** sur un dépôt GitHub public
- Une **capture d'écran du rapport de tests Jest** sur l'ensemble des fichiers d'UI (`src/views`) et des fichiers d'UX (`src/containers`) du _front-end_
- Une **capture d'écran du rapport de couverture Jest**
- Le **plan de test _End-to-End_** pour le parcours employé

## Technologies mises en oeuvre

- JavaScript (ES6)
- Framework de test Jest
- NodeJS
- Chrome DevTools

## Comment ça marche ?

> Les exemples en ligne de commande fournis ici s'appliquent en priorité aux systèmes UNIX (notamment macOS ou les distributions Linux). Pour Windows, la syntaxe peut varier (alternativement, je vous conseille plutôt d'utiliser le [Sous-système Windows pour Linux](https://docs.microsoft.com/fr-fr/windows/wsl/install))

1. Cloner le projet
2. Pour le back-end comme pour le front-end, il convient d'installer en premier lieu les dépendances npm

  - Back-end

  ```bash
  ~$ cd Billed-app-FR-Back/
  ~$ npm i -D
  ```

  - Front-end

  ```bash
  ~$ cd Billed-app-FR-Front/
  ~$ npm i -D
  ~$ npm i -D live-server
  ```

3. Exécuter le tout

  - Back-end

  ```bash
  ~$ cd Billed-app-FR-Back/
  ~$ npm run run:dev
  ```

  - Front-end

  ```bash
  ~$ cd Billed-app-FR-Front/
  ~$ npx live-server
  ```

4. C'est prêt !

  - Accès à l'application : `http://localhost:8080`
  - Accès au rapport de couverture : `http://localhost:8080/coverage/lcov-report`
