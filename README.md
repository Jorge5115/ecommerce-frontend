# Stack Shop — Frontend

Interfaz de usuario para una plataforma e-commerce completa construida con React 18 y Redux Toolkit. Conectada a una API REST con autenticación JWT, notificaciones en tiempo real por WebSocket y subida de imágenes a Cloudinary.

🔗 **Backend:** [github.com/Jorge5115/ecommerce-backend](https://github.com/Jorge5115/ecommerce-backend)

---

## Funcionalidades

- **Autenticación** — login, registro y rutas protegidas por rol (USER / ADMIN)
- **Catálogo de productos** — filtros por categoría, búsqueda y paginación
- **Detalle de producto** — galería de imágenes, reseñas y añadir al carrito
- **Carrito de compra** — gestión completa con selector de cantidad y resumen de compra
- **Checkout** — formulario de envío y validación de cupones de descuento
- **Pedidos** — historial y detalle de cada pedido con tracking de estado
- **Perfil de usuario** — edición de datos y cambio de contraseña
- **Wishlist** — lista de favoritos con opción de mover al carrito
- **Panel de administración** — gestión de productos, categorías, pedidos, usuarios y cupones con dashboard de analytics
- **Notificaciones en tiempo real** — integración con WebSocket
- **Subida de imágenes** — preview antes de subir a Cloudinary

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 |
| Estado global | Redux Toolkit |
| Routing | React Router v6 |
| HTTP | Axios (con interceptors JWT) |
| UI | Bootstrap 5 |
| Estilos | Tailwind CSS |
| Notificaciones | React Toastify |

---

## Requisitos previos

- Node.js 18+
- El [backend](https://github.com/Jorge5115/ecommerce-backend) corriendo en `http://localhost:8080`

---

## Instalación y arranque

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jorge5115/ecommerce-frontend.git
cd ecommerce-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la URL del backend

En `src/api/axiosConfig.js` (o equivalente), asegúrate de que apunta al backend:

```js
const API_BASE_URL = 'http://localhost:8080/api';
```

### 4. Arrancar la aplicación

```bash
npm start
```

La app estará disponible en `http://localhost:3000`

---

## Estructura del proyecto

```
src/
├── api/           # Llamadas a la API (axios)
├── components/    # Componentes reutilizables (Navbar, Footer, Loading...)
├── pages/         # Páginas de la aplicación
│   ├── auth/      # Login, Register
│   ├── products/  # Catálogo y detalle
│   ├── cart/      # Carrito
│   ├── checkout/  # Checkout y pedidos
│   ├── profile/   # Perfil y wishlist
│   └── admin/     # Panel de administración
├── store/         # Redux store y slices
└── App.js         # Rutas y configuración
```

---

## Autor

**Jorge Casanova Sánchez**  
[LinkedIn](https://www.linkedin.com/in/jorge-casanova-sánchez/) · [GitHub](https://github.com/Jorge5115)
