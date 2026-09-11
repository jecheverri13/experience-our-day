# Nuestro día ❤️

Una experiencia web interactiva y narrativa diseñada para acompañar un día especial. La experiencia guía a la persona a través de cuatro etapas, cada una desbloqueada por un código que recibe presencialmente, construyendo una historia emocional que culmina en un encuentro real.

## Qué es

La web funciona como hilo conductor de un día especial. Diferentes personas participan en actividades reales (uñas, cabello, vestido) y cada una entrega un código que desbloquea la siguiente etapa en la web. La experiencia digital construye anticipación y emoción hasta el momento final: un encuentro presencial.

**La experiencia web no es el final. El final ocurre en persona.**

---

## Requisitos

- **Node.js** 18 o superior
- **npm** 9 o superior (incluido con Node.js)

---

## Instalación

```bash
git clone <tu-repositorio>
cd nuestro-dia
npm install
```

---

## Ejecutar localmente

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

---

## Personalización

### Modificar nombres

Abre `src/config/experience.js` y cambia:

```js
herName: 'Su nombre',
myName: 'Tu nombre',
```

### Agregar fotografías

1. Coloca las fotos en `/public/images/`
2. Edita la sección `images` en `src/config/experience.js`:

```js
images: {
  intro: '/images/mi-foto-intro.jpg',
  nails: '/images/mi-foto-nails.jpg',
  hair: '/images/mi-foto-hair.jpg',
  dress: '/images/mi-foto-dress.jpg',
  date: '/images/mi-foto-date.jpg',
  final: '/images/mi-foto-final.jpg',
}
```

**Recomendaciones para fotos:**
- Formato: JPG o WebP
- Tamaño: no más de 500KB por foto (optimiza con herramientas como [Squoosh](https://squoosh.app))
- Proporción ideal: vertical (4:5 o 3:4) para la mejor experiencia en móvil
- La foto de intro y final son las más importantes visualmente

### Cambiar códigos

En `src/config/experience.js`, modifica el campo `code` de cada etapa en el array `STAGES`:

```js
{
  id: 'nails',
  code: 'TU-CODIGO-01',
  // ...
}
```

Los códigos son **insensibles a mayúsculas/minúsculas** y **toleran espacios** al inicio y final.

### Cambiar textos

Todos los textos están en dos lugares dentro de `src/config/experience.js`:

- **`STAGES`** → textos de teaser y narrativa por cada etapa
- **`TEXTS`** → textos de la interfaz (intro, regreso, final, etc.)

Puedes modificar cualquier texto sin tocar los componentes.

### Cambiar etapas

El array `STAGES` define las etapas. Puedes:

- Modificar los textos de cualquier etapa
- Cambiar el orden (las etapas se procesan en el orden del array)
- Agregar o eliminar etapas (ajusta también los códigos)

**Nota:** Si agregas o eliminas etapas, actualiza también la función `isValidState` en `src/utils/storage.js`.

### Configurar ubicación final

En `src/config/experience.js`:

```js
finalDestination: {
  enabled: true,
  latitude: 4.8133,
  longitude: -75.6961,
  mapsUrl: 'https://maps.google.com/?q=4.8133,-75.6961',
  label: 'Restaurante tal, calle tal',
}
```

Cuando `enabled: true`, la pantalla final mostrará un botón "Encontrarme" que abre Google Maps.

### Configurar versículo bíblico

```js
verse: {
  enabled: true,
  reference: 'Jeremías 29:11',
  text: 'Porque yo sé los planes que tengo para ustedes...',
}
```

### Configurar horarios (opcional)

El campo `timezone` está configurado como `America/Bogota`. Si en el futuro necesitas mostrar horarios, están preparados para usar esta zona horaria. Actualmente los códigos son el único mecanismo de desbloqueo.

---

## Cómo funciona localStorage

La experiencia guarda el progreso en el almacenamiento local del navegador:

```json
{
  "startedAt": "2025-...",
  "completedActivities": ["nails", "hair"],
  "currentStep": "dress",
  "lastUpdated": "2025-..."
}
```

### Comportamientos:
- **Refresh / cerrar y volver a abrir** → el progreso se conserva
- **Código incorrecto** → no modifica el progreso
- **Todas las etapas completadas** → muestra la pantalla final directamente
- **Datos corruptos** → se reinicia automáticamente sin errores

### Limitaciones:
- ⚠️ El progreso solo existe en el **mismo navegador y dispositivo**
- Cambiar de navegador, dispositivo o usar modo incógnito = progreso nuevo
- Borrar datos del navegador = progreso nuevo
- **No hay backend ni sincronización entre dispositivos**

---

## Build para producción

```bash
npm run build
```

Genera los archivos estáticos en `/dist`.

Para verificar el build localmente:

```bash
npm run preview
```

---

## Deploy

### Cloudflare Pages (recomendado)

1. Sube tu repositorio a GitHub
2. Ve a [Cloudflare Pages](https://pages.cloudflare.com)
3. Conecta tu repositorio
4. Configuración:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 18+
5. Deploy

### Vercel

1. Sube a GitHub
2. Ve a [Vercel](https://vercel.com)
3. Importa el repositorio
4. Vercel detectará Vite automáticamente
5. Deploy

### Render (Static Site)

1. Sube a GitHub
2. Ve a [Render](https://render.com)
3. Crea un "Static Site"
4. Configura:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

---

## Generar el código QR

Después de desplegar:

1. Copia la URL de tu sitio (ej: `https://nuestro-dia.pages.dev`)
2. Genera un QR con cualquier herramienta:
   - [QR Code Generator](https://www.qr-code-generator.com)
   - [QRCode Monkey](https://www.qrcode-monkey.com)
3. Imprime o comparte el QR

---

## Limitación de seguridad

Esta es una aplicación 100% frontend. Los códigos están en el JavaScript del navegador. Una persona con conocimientos técnicos podría inspeccionarlos. Esto es una **decisión de diseño** — no requiere backend porque:

- Los códigos se entregan presencialmente
- La "seguridad" real es que ella no sabe que debe buscar códigos en el código fuente
- Agregar un backend añadiría complejidad innecesaria

---

## Estructura del proyecto

```
nuestro-dia/
├── public/images/       ← Fotografías (colocar aquí)
├── src/
│   ├── components/      ← Componentes de UI
│   ├── config/          ← Configuración centralizada
│   │   └── experience.js  ← ★ Archivo principal de personalización
│   ├── hooks/           ← Lógica de estado
│   ├── utils/           ← Utilidades (localStorage)
│   ├── App.jsx          ← Componente principal
│   ├── index.css        ← Estilos globales
│   └── main.jsx         ← Punto de entrada
├── index.html
└── package.json
```

---

## Tecnologías

- **React 18** — UI
- **Vite** — Build tool
- **Tailwind CSS** — Estilos
- **localStorage** — Persistencia

Sin dependencias adicionales. Sin backend. Sin base de datos.
