# TopVent — Prompts para generación de imágenes

## Contexto de diseño de la app
- **Paleta**: primario navy `#30364F` · fondo crema `#F0F0DB` · tarjetas blancas · azul-gris secundario `#ACBAC4`
- **Colores de estado**: verde esmeralda (disponible) · ámbar (ocupada) · azul (reservada) · rojo (mantenimiento)
- **Estilo UI**: SaaS moderno, minimalista, bordes redondeados, tipografía sans-serif limpia
- **Dimensiones recomendadas**: 1200 × 800 px, relación de aspecto 3:2

---

## 1. `hero.png`
> Uso: fondo de la sección hero al **6% de opacidad** — actúa como textura de ambiente.
> Necesita densidad visual para que se perciba a baja opacidad.

```
Fotografía aérea cenital de un elegante comedor de restaurante durante el servicio de cena.
Manteles de lino blanco, velas encendidas, copas de vino captando la luz, comensales bien
vestidos cenando, meseros con uniformes oscuros moviéndose entre las mesas. Tonos cálidos
intensos — ámbar profundo, crema, oro suave. Perspectiva cenital dramática, poca profundidad
de campo. Texturas muy detalladas: tela, cristalería, pisos de madera. Calidad de fotografía
editorial gastronómica. Cámara de formato medio, ultra nítida. Sin texto, sin superposiciones.
```

---

## 2. `funciones-mesas-tiempo-real.png`
> Función: "Mesas en tiempo real" — estado de cada mesa al instante

```
Captura de pantalla limpia de un panel de administración de mesas de restaurante. Fondo
crema claro (#F0F0DB). El encabezado de la página dice "Mesas" con el subtítulo "12 mesas ·
7 disponibles · 4 ocupadas · 1 reservada". Debajo hay una cuadrícula responsiva de tarjetas
de mesa redondeadas (border-radius 12px, fondo blanco, sombra sutil). Cada tarjeta tiene:
- Un borde superior grueso de color: verde esmeralda para "Disponible", ámbar/naranja para
  "Ocupada", azul para "Reservada"
- Número de mesa en negrita (Mesa 1, Mesa 2, etc.)
- Una pequeña insignia de estado con color
- Número de comensales y tiempo transcurrido para mesas ocupadas ("4 personas · 42 min")
- Etiqueta "Disponible" en texto atenuado para mesas libres
Las tarjetas están dispuestas en 4 columnas × 3 filas. Esquina superior derecha con botón
navy "+ Nueva mesa". Tipografía sans-serif mínima. Color de acento navy (#30364F). Sin marco
de dispositivo, solo interfaz.
```

---

## 3. `funciones-pedidos-sin-papel.png`
> Función: "Pedidos sin papel" — meseros toman pedidos desde su dispositivo

```
Captura de pantalla limpia de una interfaz de creación de pedidos para mesero de restaurante,
diseño mobile-first. Vista de tablet o teléfono ancho. Fondo blanco.

Panel izquierdo (40% del ancho): lista vertical de categorías del menú como pestañas píldora
— "Entradas", "Platos principales", "Postres", "Bebidas" — con la activa resaltada en navy.
Debajo, lista desplazable de platillos (Filete de res $320, Ensalada César $180, Copa de vino
tinto $140, Pasta al pesto $220) — cada elemento es una fila con nombre, precio y botón
circular "+ Agregar" en navy.

Panel derecho (60% del ancho): tarjeta de resumen de orden titulada "Orden · Mesa 3". Muestra
3 platillos agregados con controles de cantidad (− 1 +) y subtotales. Parte inferior muestra
"Total: $780" en negrita y un botón grande "Enviar a cocina" en navy con texto blanco.

Fuente sans-serif limpia, verde esmeralda para conteos, navy como color primario, fondo
blanco cálido. Sin marco de dispositivo, solo interfaz.
```

---

## 4. `funciones-gestion-meseros.png`
> Función: "Gestión de meseros" — asigna mesas, monitorea carga de trabajo

```
Captura de pantalla limpia de un panel de administración de meseros. Fondo blanco/crema.

Encabezado de página: "Meseros" con subtítulo "10 en total · 8 activos". Arriba a la derecha
hay un botón navy "+ Nuevo mesero" y un campo de búsqueda con ícono de lupa.

Debajo: tabla de lista con columnas — Nombre, Correo electrónico, Estado, Acciones. Filas:
- Andrés García | andres@topvent.com | punto verde "Activo" | menú ⋮
- María López    | maria@topvent.com  | punto verde "Activo" | menú ⋮
- Carlos Ruiz    | carlos@topvent.com | punto gris "Inactivo" | menú ⋮
- Sofía Méndez  | sofia@topvent.com  | punto verde "Activo" | menú ⋮

Cada fila tiene estado hover sutil. Las insignias de estado son píldoras redondeadas: verde
esmeralda para activo, gris atenuado para inactivo. Tipografía sans-serif limpia. Color
primario navy. Diseño minimalista con mucho espacio en blanco. Sin marco de dispositivo.
```

---

## 5. `funciones-reportes.png`
> Función: "Reportes automáticos" — ventas diarias, platillos más pedidos, tiempos de servicio

```
Captura de pantalla limpia de un panel de análisis de restaurante. Fondo blanco/crema.

Arriba: barra de filtro de rango de fechas con dos entradas de fecha ("Desde: 01/04/2026" ·
"Hasta: 18/04/2026") y un botón navy "Aplicar".

Cuatro tarjetas de estadísticas en cuadrícula 2×2, cada una con ícono, etiqueta y valor:
- 💰 "Ingresos del período" → $48,320 (ícono verde esmeralda)
- 📋 "Total de órdenes" → 287
- 📈 "Ticket promedio" → $168
- ✅ "Órdenes cerradas" → 241

Debajo: sección titulada "Ventas por mesero" — gráfica de barras horizontales simples con 4
barras etiquetadas con nombres de meseros (Andrés G., María L., Carlos R., Sofía M.) y sus
totales de ingresos. Barras rellenas en navy con longitudes variables. Valores al final de
cada barra.

Fuente sans-serif limpia, navy (#30364F) y verde esmeralda como colores de gráfica. Diseño
minimalista orientado a datos. Sin marco de dispositivo.
```

---

## 6. `funciones-sincronizacion.png`
> Función: "Sincronización instantánea" — cocina, barra y caja siempre alineadas

```
Ilustración de producto estilizada con tres pantallas flotando sobre un fondo crema suave
(#F0F0DB):

Izquierda (ligeramente atrás): monitor de escritorio mostrando la lista de órdenes del admin
con filtros de estado.
Centro (al frente, más grande): tablet mostrando la tarjeta de orden activa del mesero —
"Orden #47 · Mesa 5 · EN PROGRESO" — con una insignia de estado esmeralda pulsante.
Derecha (ligeramente atrás): smartphone mostrando una notificación de cocina "¡Nuevo pedido!
Mesa 5" con ícono de campana.

Líneas delgadas y luminosas conectando las tres pantallas (verde esmeralda, sutiles, como una
red). Todos los dispositivos tienen biseles redondeados. Interfaz uniforme: fondos de tarjeta
blancos, primario navy, insignias de estado esmeralda. Sombras suaves. Estilo de ilustración
plano con toque 3D suave. Sin texto fuera de las pantallas.
```

---

## 7. `funciones-roles-permisos.png`
> Función: "Roles y permisos" — administradores, meseros y cajeros con accesos diferenciados

```
Captura de pantalla limpia de una pantalla de gestión de roles y permisos. Fondo blanco.

Tres tarjetas de rol una al lado de la otra con esquinas redondeadas (16px) y borde sutil:

Tarjeta 1 — "Administrador" (borde superior navy)
Insignia: "Acceso total" en navy.
Lista: ✓ Dashboard · ✓ Mesas · ✓ Pedidos · ✓ Meseros · ✓ Reportes · ✓ Productos

Tarjeta 2 — "Mesero" (borde superior azul-gris, #ACBAC4)
Insignia: "Acceso operativo" en azul-gris.
Lista: ✓ Mesas · ✓ Mis pedidos · ✗ Reportes · ✗ Meseros · ✗ Productos

Tarjeta 3 — "Cajero" (borde superior ámbar)
Insignia: "Acceso de caja" en ámbar.
Lista: ✓ Pedidos · ✓ Reportes · ✗ Meseros · ✗ Productos · ✗ Configuración

Marcas de verificación en verde esmeralda, marcas X en rojo atenuado. Tipografía sans-serif
limpia. Navy, azul-gris y ámbar como acento por rol. Fondo blanco crema. Sin marco de
dispositivo.
```

---

## Notas de uso

| Herramienta | Recomendación |
|---|---|
| **DALL-E 3** (ChatGPT) | Pegar el prompt directamente. Solicitar formato `1792 × 1024`. |
| **Midjourney** | Agregar al final: `--ar 3:2 --style raw --v 6` |
| **Ideogram / Adobe Firefly** | Funcionan bien para maquetas de UI — usar el prompt tal cual. |

### Ajuste fino post-generación
- Las imágenes de funciones **deben verse como UI real**, no como ilustraciones abstractas.
- Si el resultado es demasiado ilustrativo, agregar al prompt: *"captura de pantalla fotorrealista de UI, interfaz de app pixel-perfect exacta, no una ilustración"*
- Si el resultado tiene texto legible incorrecto, agregar: *"todo el texto en español, sin lorem ipsum de relleno"*

### Nombres de archivo (exactos, ya referenciados en el código)
```
landing/public/imagenes/hero.png
landing/public/imagenes/funciones-mesas-tiempo-real.png
landing/public/imagenes/funciones-pedidos-sin-papel.png
landing/public/imagenes/funciones-gestion-meseros.png
landing/public/imagenes/funciones-reportes.png
landing/public/imagenes/funciones-sincronizacion.png
landing/public/imagenes/funciones-roles-permisos.png
```
