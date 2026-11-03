# link-tree-pro

Página personal tipo "link in bio" con:

- **Perfil:** foto de fondo, avatar, nombre, usuario, redes sociales y descripción.
- **Music:** panel estilo Spotify con lo que estoy escuchando, minutos escuchados, top de artistas y top de canciones.
- **Movies:** diario de películas vistas con póster, año, puntuación y fecha.

Los datos vienen de mi API [reelbeat-api](https://github.com/FOOR29/reelbeat-api), que limpia la información de Last.fm, Deezer y Trakt.

## Tecnologías

| Herramienta | Para qué |
|---|---|
| React 19 + TypeScript | Interfaz y tipado |
| Vite | Servidor de desarrollo y build |
| Tailwind CSS 4 | Estilos (paleta de colores en `src/index.css`) |
| react-icons (Lucide) | Iconos |
| pnpm | Gestor de paquetes |

## Cómo correrlo

Requisitos: Node.js y pnpm.

```bash
pnpm install
```

```bash
pnpm dev
```

Abre http://localhost:5173

| Script | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo, se recarga al guardar |
| `pnpm build` | Revisa TypeScript y genera la versión de producción en `dist/` |
| `pnpm preview` | Sirve la carpeta `dist/` para probar el build |
| `pnpm lint` | ESLint (por ahora falla: `typescript-eslint` aún no soporta TypeScript 7) |

## Estructura de carpetas

```text
link-tree-pro/
├── public/
│   └── images/profile/          fotos del perfil (avatar.webp, background.webp)
├── src/
│   ├── main.tsx                 punto de entrada
│   ├── App.tsx                  cabecera → pestañas → Music/Movies → footer
│   ├── index.css                Tailwind, paleta de colores y animaciones
│   ├── config/
│   │   └── profile.ts           nombre, usuario, descripción, fotos y redes sociales
│   ├── services/
│   │   └── api.ts               URL de la API y una función por endpoint
│   ├── hooks/
│   │   ├── useApi.ts            estados de carga / error / éxito + reintentar
│   │   └── useCountUp.ts        animación del contador de minutos
│   ├── types/
│   │   └── api.ts               tipos de las respuestas de la API
│   ├── utils/
│   │   └── format.ts            formato de números y fechas
│   └── components/
│       ├── profile/             ProfileHeader (fondo, avatar, redes)
│       ├── music/               MusicDashboard y una tarjeta por cada dato
│       ├── movies/              MovieDiary (cuadrícula) y MovieCard
│       ├── ui/                  piezas reutilizables: Card, FallbackImage, Skeleton, StatusCard
│       ├── Tabs.tsx             pestañas Music / Movies
│       └── Footer.tsx
├── CLAUDE.md                    guía técnica del proyecto
└── vite.config.ts
```

## Cómo funciona

1. Al abrir la página se hacen **3 peticiones a la vez** a la API:
   - `/api/music/summary`: minutos, top artistas y top canciones (todo en una sola petición).
   - `/api/music/now-playing`: la canción que suena ahora o la última escuchada.
   - `/api/movies/recent?limit=50`: las últimas películas vistas.
2. `services/api.ts` es el **único lugar que llama a la API**. `useApi` guarda si está cargando, si falló o si ya tiene datos.
3. `MusicDashboard` y `MovieDiary` usan `useApi` y pasan los datos a las tarjetas. Las tarjetas solo muestran lo que reciben.
4. Cada sección tiene sus propios estados:
   - **Cargando:** esqueletos grises animados.
   - **Error:** mensaje con botón "Try again".
   - **Vacío:** mensaje explicativo.
5. Las dos pestañas se quedan cargadas en memoria, así que al cambiar entre Music y Movies no se vuelve a pedir nada.

### La API puede tardar

La API está en el plan gratis de Render: si lleva un rato sin uso, la primera respuesta puede tardar **cerca de un minuto**.
Por eso cada petición espera hasta 90 segundos antes de mostrar error, y mientras tanto se ven los esqueletos de carga.

### Imágenes que faltan

Si una imagen viene en `null` o no carga, `FallbackImage` muestra un recuadro neutro con un icono (nota, persona o película).
Las canciones del top no traen portada de álbum en la API, así que se usa la foto del artista.

## Personalizar

### Fotos del perfil

1. Guarda tus fotos en `public/images/profile/` con estos nombres exactos:
   - `avatar.webp`: foto de perfil (cuadrada, 300 × 300 px o más).
   - `background.webp`: foto de fondo (horizontal, 1600 px de ancho o más).
2. Recarga la página.

Si quieres otro nombre o formato, cambia la ruta en `src/config/profile.ts`.

### Nombre, descripción y redes sociales

Todo está en `src/config/profile.ts`:

```ts
export const profile = {
  name: 'Forlán',
  username: 'foor29',
  description: 'Developer, music enthusiast & movie lover.',
  ...
}

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/FOOR29', icon: LuCodeXml },
  ...
]
```

Los enlaces que tienen `href: '#'` están pendientes de poner la URL real.

### Colores

Todos los colores están en `src/index.css`, dentro de `@theme`. Cambia un valor ahí y se actualiza en toda la página.

| Variable | Uso |
|---|---|
| `--color-page` | Fondo de la página |
| `--color-hero` | Parte de arriba del degradado de la cabecera |
| `--color-card` | Fondo de las tarjetas |
| `--color-chip` | Botones sociales y fondo de las pestañas |
| `--color-placeholder` | Recuadros de imágenes que faltan |
| `--color-skeleton` | Esqueletos de carga |
| `--color-fg` / `--color-muted` / `--color-subtle` | Texto principal / secundario / terciario |
| `--color-accent` | Morado principal (pestaña activa, botones) |
| `--color-accent-soft` | Morado claro para textos e iconos |
| `--color-line` | Bordes y líneas |

En los componentes se usan como clases de Tailwind: `bg-card`, `text-muted`, `border-accent`… Nunca se escriben colores fijos en los componentes.

### Animaciones

También en `src/index.css`:

- `animate-fade-up`: un elemento aparece subiendo suavemente.
- `stagger`: los elementos hijos aparecen uno tras otro (60 ms entre cada uno).

Si el sistema tiene activado "reducir movimiento", las animaciones se desactivan solas.

### Cambiar la URL de la API

Por defecto usa `https://reelbeat-api.onrender.com`. Para usar otra (por ejemplo, la API corriendo en local), crea un archivo `.env` en la raíz:

```text
VITE_API_URL=http://localhost:3000
```

## Créditos de datos

Música vía Last.fm y Deezer · Películas vía Trakt.
