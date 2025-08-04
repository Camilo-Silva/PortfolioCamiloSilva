# Portfolio Camilo Silva - Deployment Guide

## 🚀 Deploy to Netlify

Este proyecto está configurado para desplegarse automáticamente en Netlify.

### Opciones de Deploy:

#### 1. Deploy Automático desde GitHub
1. Conecta tu repositorio de GitHub a Netlify
2. **IMPORTANTE**: En la configuración de Netlify, asegúrate de:
   - **Build command**: `npm run build:prod`
   - **Publish directory**: `dist/portfolio-camilo/browser`
   - **Node version**: 18 (en Environment variables: `NODE_VERSION = 18`)
3. Netlify detectará automáticamente la configuración desde `netlify.toml`
4. El deploy se ejecutará automáticamente en cada push a la rama principal

**⚠️ Nota importante**: Si ya configuraste el sitio en Netlify, ve a Site Settings > Build & Deploy y actualiza:
- Build command: `npm run build:prod`
- Publish directory: `dist/portfolio-camilo/browser`

#### 2. Deploy Manual
```bash
# Instalar dependencias
npm install

# Build de producción
npm run build:prod

# Los archivos estarán en dist/portfolio-camilo/browser/
```

### Configuración

- **Comando de Build**: `npm run build:prod`
- **Directorio de Publicación**: `dist/portfolio-camilo/browser`
- **Redirects**: Configurados para SPA (Single Page Application)

### Características
- ✅ Angular 17+ con SSR (Server Side Rendering)
- ✅ Rutas configuradas para SPA
- ✅ Assets optimizados
- ✅ CSS y JS minificados
- ✅ Redirects automáticos para rutas de Angular

### Variables de Entorno
Si necesitas configurar variables de entorno en Netlify:
1. Ve a Site Settings > Environment Variables
2. Agrega las variables necesarias

### Troubleshooting
- Si tienes problemas con las rutas, verifica que `_redirects` esté en la carpeta de build
- Para problemas de build, revisa que todas las dependencias estén instaladas
- Los warnings de CSS budget son normales para portfolios con muchos estilos

#### ❌ Error: "CSS exceeded maximum budget"
Si obtienes errores de budget CSS durante el deploy:

1. **Verifica que uses el comando correcto**: Debe ser `npm run build:prod` no `npm run build`
2. **En Netlify UI**: Ve a Site Settings > Build & Deploy > Build settings y cambia:
   - Build command: `npm run build:prod`
   - Publish directory: `dist/portfolio-camilo/browser`
3. **Redeploy**: Haz un nuevo deploy después del cambio

#### 🔧 Si el problema persiste:
```bash
# Comando temporal para build sin errores de budget
ng build --configuration production --skip-budget
```

#### 📱 Para deploy manual rápido:
```bash
npm install
npm run build:prod
# Arrastra dist/portfolio-camilo/browser/ a Netlify
```
