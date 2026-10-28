# Plantilla Backend 2º DAM

Plantilla mínima con:

- Node.js 24
- Express 5
- TypeScript 5.9.3
- MySQL 8.4
- Dev Containers + Docker Compose
- `node_modules` almacenado en un volumen Docker

## Uso

1. Abrir la carpeta en VS Code.
2. Ejecutar **Dev Containers: Reopen in Container**.
3. Esperar a que termine `npm install`.
4. Ejecutar:

```bash
npm run dev
```

5. Abrir `http://localhost:3000`.

## Base de datos

Desde el backend, el host de MySQL es:

```text
db
```

No `localhost`.
