# Configuración alternativa para Netlify
# Si tienes problemas con netlify.toml, usa esta configuración

## En Netlify UI (Site Settings > Build & Deploy):

### Build Settings:
- **Build command**: npm run build:prod
- **Publish directory**: dist/portfolio-camilo/browser

### Environment Variables:
- NODE_VERSION: 18

### Deploy Settings:
- **Branch to deploy**: main
- **Build hooks**: Opcional para deploys automáticos

## Comandos alternativos en caso de problemas:

### Para build sin warnings de budget:
```bash
npm run build:netlify
```

### Para build manual completo:
```bash
npm ci
npm run build:prod
```

### Para deploy manual:
1. Ejecuta: `npm run build:prod`
2. Arrastra la carpeta `dist/portfolio-camilo/browser/` a Netlify

## Troubleshooting específico:

### Si el deploy falla con budget errors:
1. Cambia el build command a: `npm run build:netlify`
2. O usa: `ng build --configuration production --skip-budget`

### Si las rutas no funcionan:
- Verifica que `_redirects` esté en `dist/portfolio-camilo/browser/`
- El archivo debe contener: `/*    /index.html   200`
