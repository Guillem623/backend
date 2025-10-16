\# ADR-002: Estructura inicial del projecte



\## Context

Hem de decidir com organitzar el codi del projecte (frontend, backend i documentació). 

Podem escollir entre un \*\*monorepo\*\* (tot en un sol repositori) o repositoris separats.



\## Decisió

Optarem per un \*\*monorepo\*\* amb la següent estructura:

\- /backend → codi del servidor (Node/Express, base de dades, API REST).

\- /frontend → interfície d’usuari (React/Vue).

\- /docs → documentació (diagrames, ADRs, etc.).



\## Conseqüències

\+ Facilita la gestió de versions (tot està sincronitzat).

\+ Més senzill per a l’equip treballar amb un sol repositori.

\- Pot créixer molt i es pot fer més difícil de mantenir si el projecte escala molt.

