# Drone simulation - Projet Vuejs
Lola Gauchet

## Project setup
```
1. git clone https://github.com/lolagauchet/drone.git
2. cd drone
3. npm install
4. npm run start:stage
```

## Consignes
```
Une entreprise a de nombreux drones qui volent dans le pays et souhaite pouvoir suivre chaque drone en temps réel et individuellement, tu as comme tâche de développer un prototype de ce système.

Grâce à identifiant unique et une clé d'API, l'utilisateur peut accéder à un dashboard affichant en temps réel la dernière position du drone, sa vitesse ( unité variable ) et son altitude ( unité variable ). 
L'utilisateur doit connaître l'état de connexion de l'appreil au backend.

L'application permet de distinguer si un drone ne s'est pas déplacé pendant plus de 10 secondes ( le drone a envoyé des données mais ne s'est pas déplacé plus d'1 mètre ).

Enfin il est posssible d'envoyer des commandes au drone ( changement de vitesse, start, stop ... ) via un champ texte complété par la liste des commandes valides.
```
## Sensors utilisé
#### Switch ON/OFF
Visualisation de l'état du drone  

![Switch](/src/assets/switch.png)

**Action**  

Possibilité d'éteindre ou d'allumer le drone en cliquant sur le switch puis en mettant à jour les données du drone  

#### Données GPS
Visualisation en temps réel des coordonnées GPS du drone  

![Coordonnées GPS](/src/assets/gps.png)

**Action**  
Possibilité de modifier la valeur de la latitude ainsi que de la longitude en rentrant une valeur, cliquant sur valider puis en mettant à jour les valeurs du drone

Visualisation en temps réel de la position du drone sur une map, suivant les coordonnées GPS de celui-ci  

![Emplacment sur une map](/src/assets/map.png)

#### Altitude
Visualisation en temps réel de l'altitude du drone.  

![Altitude](/src/assets/alt.png)

**Action**  
Possibilité de modifier la valeur de l'altitude en rentrant une valeur, cliquant sur valider puis en mettant à jour les valeurs du drone

#### Vitesse
Visualisation en temps réel de la vitesse du drone en m/s.  

![Altitude](/src/assets/rate.png)

**Action**  
Possibilité de modifier la valeur de la vitesse en rentrant une valeur, cliquant sur valider puis en mettant à jour les valeurs du drone

## Sources externes

1. Utilisation de la library **vue2-leaflet** pour la mise en place de la map
2. Utilisation du framework CSS **Bulma** afin de rendre l'intégration des composants plus rapide

