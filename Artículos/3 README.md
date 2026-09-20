# Contenido de artículos

La biblioteca usa un archivo Markdown por artículo. Los textos se agrupan en estas carpetas:

- `ciencia-y-fe`
- `historia-biblica`
- `jesus-historico`
- `sufrimiento-y-mal`
- `existencia-de-dios`
- `otras-religiones`

## Convención de nombres

El nombre del archivo debe ser el slug, en minúsculas, sin acentos ni espacios y con palabras separadas por guiones. El mismo slug se usa para la imagen: por ejemplo, `Artículos/ciencia-y-fe/origen-de-la-vida.md` usa `FOTOS/articulos/origen-de-la-vida.jpg`.

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

El cuerpo queda vacío mientras el artículo está en proceso. El catálogo de la biblioteca está en `Artículos/article-index.js`, que conserva los slugs y los datos resumidos para que el sitio estático pueda renderizar la lista. La lectura automática se hace desde `leer.html` en la raíz: carga el Markdown publicado y lo convierte en HTML con la librería local `vendor/marked.js`.

## Agregar un artículo

1. Elegí la carpeta del tema.
2. Creá un archivo `<slug>.md` con el frontmatter anterior y `estado: en-proceso`.
3. Agregá la entrada correspondiente a `Artículos/article-index.js` con título, slug, tema y descripción para que el nuevo slug aparezca en la biblioteca.
4. Subí la imagen opcional a `FOTOS/articulos/<slug>.jpg` (o `.jpeg`, `.png`, `.webp`).
5. Dejá el cuerpo vacío hasta que el texto esté listo.

## Publicar un artículo

Para publicar un artículo que ya está en la lista, por ejemplo `origen-de-la-vida`:

1. Abrí `Artículos/ciencia-y-fe/origen-de-la-vida.md`.
2. Pegá el texto completo debajo del segundo `---`, usando Markdown.
3. Cambiá `estado: en-proceso` por `estado: publicado`.
4. Completá `fecha`.
5. Subí opcionalmente `FOTOS/articulos/origen-de-la-vida.jpg` (también se aceptan `.jpeg`, `.png` y `.webp`).
6. Subí opcionalmente `Artículos/origen-de-la-vida.pdf`.
7. Hacé commit y push. No crees un HTML: la tarjeta enlazará a `leer.html?slug=origen-de-la-vida` y el lector cargará el `.md` automáticamente.

`Creación del universo` es la excepción de compatibilidad: mantiene su página existente en `Artículos/creacion-del-universo.html` y su PDF actual.

Los publicados aparecen primero y muestran lectura. El botón de PDF solo aparece cuando el archivo existe. Los artículos en proceso no son clickeables y muestran únicamente la etiqueta correspondiente.

## Guía rápida de Markdown

```markdown
# Título principal
## Subtítulo

Un párrafo con **negrita** y *cursiva*.

- Primer punto
- Segundo punto

> Una cita destacada.

`código corto`
```

Usá una línea en blanco entre párrafos y encabezados. El lector convierte estos elementos al estilo de lectura del sitio.

## Slugs e imágenes

| Tema | Slug |
| --- | --- |
| Ciencia y fe | `creacion-del-universo`, `origen-de-la-vida`, `evolucion-y-fe-cristiana`, `ciencia-y-fe-en-guerra`, `milagros-son-posibles`, `conciencia-y-mente`, `argumento-moral`, `multiverso-principio-antropico`, `cristianos-fundadores-ciencia`, `universo-comprensible`, `genesis-1-edad-tierra`, `libre-albedrio-neurociencia`, `inteligencia-artificial-alma`, `dawkins-hawking-krauss` |
| Historia bíblica | `formacion-de-la-biblia`, `manuscritos-texto-biblico`, `arqueologia-y-biblia`, `autoria-evangelios`, `contradicciones-biblia`, `diluvio`, `apocrifos-gnosticos`, `rollos-mar-muerto`, `personajes-confirmados-arqueologia`, `hititas`, `jerico-conquista-canaan`, `biblia-y-mitos-cercano-oriente`, `generos-literarios`, `profecias-cumplidas` |
| Jesús histórico | `existio-jesus`, `fuentes-no-cristianas`, `resurreccion-hechos`, `tumba-vacia-apariciones`, `cristologia-temprana`, `profecias-mesianicas`, `constantino-nicea-codigo-da-vinci`, `evangelios-biografias-antiguas`, `credo-1-corintios-15`, `pablo-y-santiago`, `teorias-alternativas-resurreccion`, `paralelos-paganos`, `crucifixion`, `nombres-de-los-evangelios`, `juicio-de-jesus` |
| Sufrimiento y mal | `problema-del-mal`, `libre-albedrio-mal-moral`, `mal-natural`, `sufrimiento-inocentes`, `infierno`, `dios-antiguo-testamento-canaan`, `libro-de-job`, `mal-sin-dios`, `sufrimiento-animal`, `ocultamiento-de-dios`, `esclavitud-biblia`, `holocausto-y-fe`, `oraciones-sin-respuesta`, `acompanar-al-que-sufre`, `esperanza-cristiana` |
| Existencia de Dios | `argumento-cosmologico-kalam`, `por-que-existe-algo`, `argumento-ontologico`, `quien-creo-a-dios`, `dios-de-los-huecos`, `que-es-la-fe`, `carga-de-la-prueba`, `ateismo-agnosticismo`, `experiencia-religiosa`, `atributos-de-dios`, `apuesta-de-pascal`, `dios-y-sentido-de-la-vida`, `deismo-panteismo-teismo` |
| Otras religiones | `todas-las-religiones-iguales`, `exclusividad-de-cristo`, `pluralismo-elefante`, `cristianismo-e-islam`, `jesus-en-el-islam`, `cristianismo-y-budismo`, `hinduismo-reencarnacion`, `judaismo-y-cristianismo`, `trinidad`, `nunca-escucharon`, `mormones-testigos-jehova`, `nueva-era`, `religiosidad-popular`, `dialogar-otras-creencias` |

La imagen de `Creación del universo` también debe llamarse `creacion-del-universo.<extensión>` y vivir en `FOTOS/articulos/`. Actualmente usa la portada por slug y conserva el degradé de respaldo.
