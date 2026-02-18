# 🛒 E-commerce Full-Stack (FRONT)

Plataforma de e-commerce completa con Spring Boot + React + MySQL + Redis

## 🚀 Características

- Autenticación JWT con roles (USER/ADMIN)
- Carrito de compra con Redis
- Sistema de pedidos completo
- Reseñas y valoraciones
- Wishlist
- Sistema de cupones
- Panel de administración
- Notificaciones WebSocket en tiempo real
- Subida de imágenes a Cloudinary
- Documentación Swagger

## 🛠️ Tecnologías

**Frontend:**
- React 18
- Redux Toolkit
- React Router
- Bootstrap 5
- Axios

### Día 16: Setup Frontend React
- [x] Proyecto React creado con create-react-app
- [x] Dependencias instaladas (axios, react-router-dom, redux, react-toastify)
- [x] Estructura de carpetas creada
- [x] Axios configurado con interceptors JWT
- [x] Redux store configurado
- [x] Auth slice creado con login y register
- [x] Cart slice creado
- [x] App.js configurado con Router y Provider

### Día 17: Páginas de Autenticación
- [x] Bootstrap instalado y configurado
- [x] LoginPage creada con formulario completo
- [x] RegisterPage creada con formulario completo
- [x] ProtectedRoute creado para rutas protegidas
- [x] App.js actualizado con rutas de auth
- [x] Navegación entre login y register funcional
- [x] Frontend conectado con backend JWT"
      
### Día 18: Página de Productos
- [x] productApi y categoryApi creados
- [x] Navbar con autenticación y carrito
- [x] ProductCard con añadir al carrito
- [x] ProductsPage con filtros y paginación
- [x] App.js actualizado con ruta /products
- [x] Bootstrap JS añadido para dropdown"

### Dia 19: Detalle de Producto y Carrito
- [x] cartApi y reviewApi creados
- [x] ProductDetailPage con resenas
- [x] CartPage con gestion completa
- [x] App.js actualizado con nuevas rutas
- [x] Selector de cantidad en detalle
- [x] Resumen de compra en carrito

### Dia 20: Checkout y Pedidos
- [x] orderApi y couponApi creados
- [x] CheckoutPage con formulario de envio
- [x] CheckoutPage con validacion de cupones
- [x] OrdersPage con lista de pedidos
- [x] OrderDetailPage con detalle completo
- [x] App.js actualizado con nuevas rutas

### Dia 21: Perfil de Usuario y Wishlist
- [x] userApi y wishlistApi creados
- [x] ProfilePage con edicion de datos
- [x] ProfilePage con cambio de contrasena
- [x] WishlistPage con gestion completa
- [x] Boton wishlist en ProductDetailPage
- [x] App.js actualizado con nuevas rutas

### Dia 22: Panel de Administracion
- [x] adminApi creado con todos los endpoints
- [x] AdminLayout con sidebar de navegacion
- [x] AdminDashboard con estadisticas y top productos
- [x] AdminProducts con CRUD completo
- [x] AdminOrders con cambio de estado
- [x] AdminUsers con gestion de roles
- [x] App.js actualizado con rutas admin

### Dia 23: Admin Categorias y Cupones
- [x] AdminCategories con CRUD completo
- [x] AdminCoupons con CRUD completo
- [x] adminApi actualizado con metodos faltantes
- [x] App.js actualizado con nuevas rutas admin

### Dia 24: Subida de imagenes con Cloudinary

- [x] ImageUpload component creado
- [x] Integrado en AdminProducts
- [x] Integrado en AdminCategories
- [x] Preview de imagen antes de subir
- [x] Validacion de tipo y tamaño

### Dia 25: Mejoras UI y componentes reutilizables

- [x] Pagina 404 creada
- [x] Componente Loading reutilizable
- [x] Componente EmptyState reutilizable
- [x] Footer Stack Shop con logo y redes sociales
- [x] Footer con tecnologias del proyecto
- [x] Navbar y titulo actualizados a Stack Shop
- [x] Carrito badge carga automaticamente

### Dia 26: Landing Page y mejoras visuales

- [x] HomePage completa con HeroSection, Stats, Categories y Featured
- [x] Navbar rediseñada: links centrados, hover verde, flecha activa
- [x] Iconos personalizados PNG en navbar y landing
- [x] ProductCard y Wishlist con altura fija uniforme
- [x] ProductGalleryPicker y CategoryGalleryPicker separados
- [x] AdminCategories con edicion completa
- [x] Footer profesional con tecnologias Stack

### Dia 27: Mejoras visuales y UX

- [x] AdminLayout con nuevo diseño sidebar
- [x] Iconos personalizados en admin panel
- [x] Dashboard con cards visuales mejoradas
- [x] Traduccion de estados a español
- [x] Filtro de categorias desde landing funcional
- [x] Transiciones optimizadas en ProductsPage
- [x] ProductGalleryPicker y CategoryGalleryPicker separados
- [x] Mejoras visuales generales en admin
