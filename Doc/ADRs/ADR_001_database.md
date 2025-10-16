\# ADR-001: Elecció de base de dades



\## Context

Necessitem una base de dades flexible per a emmagatzemar productes, usuaris i comandes. 

El projecte és una botiga online amb entitats diverses i amb possibles canvis en el futur (nous atributs, promocions, etc.).



\## Decisió

Farem servir \*\*MongoDB\*\* com a base de dades principal, gestionada via \*\*Docker\*\* per facilitar la portabilitat i l’entorn de desenvolupament.



\## Conseqüències

\+ Flexibilitat per afegir nous camps i entitats sense modificar l’esquema.

\+ Bona integració amb \*\*Node.js/Express\*\* i eines modernes.

\- Menys òptim per a consultes molt relacionals i transaccions complexes.

