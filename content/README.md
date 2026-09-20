# Contenido de artículos

La biblioteca usa un archivo Markdown por artículo. Los textos se agrupan en estas carpetas:

- `ciencia-y-fe`
- `historia-biblica`
- `jesus-historico`
- `sufrimiento-y-mal`
- `existencia-de-dios`
- `otras-religiones`

## Convención de nombres

El nombre del archivo debe ser el slug, en minúsculas, sin acentos ni espacios y con palabras separadas por guiones. El mismo slug se usa para la imagen: por ejemplo, `origen-de-la-vida.md` usa `public/imagenes/articulos/origen-de-la-vida.jpg`.

Las imágenes pueden ser `.jpg`, `.jpeg`, `.png` o `.webp`. Si no existe ninguna, la tarjeta conserva el degradé verde/naranja. `enfoque_imagen` es opcional y acepta valores CSS como `center 20%`.

## Frontmatter

Cada archivo empieza así:

```yaml
---
titulo: "Título del artículo"
slug: nombre-del-slug
tema: "Ciencia y fe"
descripcion: "Frase breve para la tarjeta."
fecha: ""
estado: en-proceso
enfoque_imagen: ""
---
```

El cuerpo queda vacío mientras el artículo está en proceso. El catálogo de la biblioteca está en `content/article-index.js`, que conserva los mismos datos para que el sitio estático pueda renderizar la lista.

## Agregar un artículo

1. Elegí la carpeta del tema.
2. Creá un archivo `<slug>.md` con el frontmatter anterior y `estado: en-proceso`.
3. Agregá la entrada correspondiente a `content/article-index.js` con título, slug, tema y descripción para que el nuevo slug aparezca en la biblioteca.
4. Subí la imagen opcional a `public/imagenes/articulos/<slug>.jpg` (o `.jpeg`, `.png`, `.webp`).
5. Dejá el cuerpo vacío hasta que el texto esté listo.

## Publicar un artículo

Pegá el texto debajo del segundo `---`, cambiá `estado` a `publicado` y completá `fecha`. La biblioteca lee esos valores directamente desde el Markdown; no hace falta tocar el índice para cambiar el estado de un artículo ya creado. Agregá la página HTML y el PDF con el mismo slug en `Artículos/`. Los publicados aparecen primero y muestran lectura y descarga; los que siguen en proceso solo muestran esa etiqueta.

## Slugs e imágenes

| Tema | Slug |
| --- | --- |
| Ciencia y fe | `creacion-del-universo`, `origen-de-la-vida`, `evolucion-y-fe-cristiana`, `ciencia-y-fe-en-guerra`, `milagros-son-posibles`, `conciencia-y-mente`, `argumento-moral`, `multiverso-principio-antropico`, `cristianos-fundadores-ciencia`, `universo-comprensible`, `genesis-1-edad-tierra`, `libre-albedrio-neurociencia`, `inteligencia-artificial-alma`, `dawkins-hawking-krauss` |
| Historia bíblica | `formacion-de-la-biblia`, `manuscritos-texto-biblico`, `arqueologia-y-biblia`, `autoria-evangelios`, `contradicciones-biblia`, `diluvio`, `apocrifos-gnosticos`, `rollos-mar-muerto`, `personajes-confirmados-arqueologia`, `hititas`, `jerico-conquista-canaan`, `biblia-y-mitos-cercano-oriente`, `generos-literarios`, `profecias-cumplidas` |
| Jesús histórico | `existio-jesus`, `fuentes-no-cristianas`, `resurreccion-hechos`, `tumba-vacia-apariciones`, `cristologia-temprana`, `profecias-mesianicas`, `constantino-nicea-codigo-da-vinci`, `evangelios-biografias-antiguas`, `credo-1-corintios-15`, `pablo-y-santiago`, `teorias-alternativas-resurreccion`, `paralelos-paganos`, `crucifixion`, `nombres-de-los-evangelios`, `juicio-de-jesus` |
| Sufrimiento y mal | `problema-del-mal`, `libre-albedrio-mal-moral`, `mal-natural`, `sufrimiento-inocentes`, `infierno`, `dios-antiguo-testamento-canaan`, `libro-de-job`, `mal-sin-dios`, `sufrimiento-animal`, `ocultamiento-de-dios`, `esclavitud-biblia`, `holocausto-y-fe`, `oraciones-sin-respuesta`, `acompanar-al-que-sufre`, `esperanza-cristiana` |
| Existencia de Dios | `argumento-cosmologico-kalam`, `por-que-existe-algo`, `argumento-ontologico`, `quien-creo-a-dios`, `dios-de-los-huecos`, `que-es-la-fe`, `carga-de-la-prueba`, `ateismo-agnosticismo`, `experiencia-religiosa`, `atributos-de-dios`, `apuesta-de-pascal`, `dios-y-sentido-de-la-vida`, `deismo-panteismo-teismo` |
| Otras religiones | `todas-las-religiones-iguales`, `exclusividad-de-cristo`, `pluralismo-elefante`, `cristianismo-e-islam`, `jesus-en-el-islam`, `cristianismo-y-budismo`, `hinduismo-reencarnacion`, `judaismo-y-cristianismo`, `trinidad`, `nunca-escucharon`, `mormones-testigos-jehova`, `nueva-era`, `religiosidad-popular`, `dialogar-otras-creencias` |

La imagen de `Creación del universo` también debe llamarse `creacion-del-universo.<extensión>` y vivir en `public/imagenes/articulos/`. Actualmente no había una portada independiente en el proyecto, por eso usa el degradé de respaldo.
