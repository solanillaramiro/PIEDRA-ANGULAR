# Guía rápida para agregar artículos

## Categorías fijas
Usá estas categorías exactamente como están definidas en el sitio:
- Cosmovisión
- Historia bíblica
- Jesús histórico
- Sufrimiento y mal

Esto mantiene los filtros uniformes y evita que la biblioteca quede desordenada.

## Regla de nombres
Usá un nombre con slug limpio y consistente:
- minúsculas
- sin espacios
- sin acentos
- sin caracteres raros
- separados por guiones

Ejemplos correctos:
- `creacion-del-universo.pdf`
- `creacion-del-universo.html`
- `muerte-y-resurreccion.html`
- `dios-y-el-mal.html`

Ejemplos a evitar:
- `Creación del universo.pdf`
- `creacion del universo.html`
- `dios_y_el_mal.pdf`

## 1) Preparar el PDF
- Guardá el texto final en la carpeta `Artículos/`
- El nombre del PDF debe coincidir con el slug del artículo
- El nombre del HTML también debe usar ese mismo slug

## 2) Copiar la plantilla
- Copiá el archivo `plantilla-articulo.html`
- Renombrá la copia con el slug del artículo

## 3) Completar la metadata del artículo
Reemplazá estos campos dentro del HTML:
- `[Título del artículo]`
- `[Tema]`
- `[Día] de [mes] de [año]`
- `[Resumen breve del artículo...]`
- `[Nombre-del-archivo.pdf]`

## 4) Agregarlo al listado de la home
En `script.js`, dentro del array `articleLibrary`, agregá un objeto con esta estructura:

```js
{
  id: 'slug-del-articulo',
  title: 'Título del artículo',
  category: 'Cosmovisión',
  date: '15 de septiembre de 2026',
  coverClass: 'cosmovision',
  excerpt: 'Resumen para la tarjeta del listado.',
  description: 'Descripción extendida para búsquedas y filtros.',
  file: 'Artículos/slug-del-articulo.pdf',
  url: 'Artículos/slug-del-articulo.html',
},
```

## 5) Mantener la home liviana
- No pongas el texto completo en `index.html`
- Dejá en la home solo la portada, fecha y resumen
- La lectura se hace en la página dedicada del artículo

## 6) Recomendación final
Para que el sitio escale bien, conviene que cada artículo siga exactamente este patrón:
- slug único
- PDF con nombre coincidente
- HTML con nombre coincidente
- categoría elegida entre las fijas
- fecha y resumen claros

Con esta convención, el sitio se puede seguir ampliando sin desorden.
