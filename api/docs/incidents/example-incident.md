# Informe d'Incident

**Data:** 20 de maig de 2026

**Descripció del problema:** Els usuaris no podien finalitzar el procés de pagament; l'API retornava un error intern de servidor (HTTP 500) a l'hora de crear la sessió de Stripe. L'error no oferia detalls a l'usuari final, però es va registrar als logs del servidor.

**RequestId relacionat:** f141ffc6-673d-4cda-9aef-c8c74a8a27e1

**Endpoint afectat:** `POST /api/checkout/crear`

**Causa arrel:** La variable d'entorn `STRIPE_SECRET_KEY` s'havia eliminat accidentalment o no s'estava carregant correctament en l'entorn de producció, la qual cosa impedia la comunicació i l'autenticació amb l'API de Stripe al moment de generar la sessió de checkout.

**Solució aplicada:** Es va restaurar la variable d'entorn `STRIPE_SECRET_KEY` al fitxer `.env` i/o als secrets de l'entorn, i es va reiniciar el contenidor del backend (`docker compose restart backend`) per carregar la configuració correctament. A més, es recomana afegir una petita validació a l'arrencada de l'aplicació per garantir que variables crítiques com aquesta no faltin mai.
