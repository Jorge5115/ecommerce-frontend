import { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import ProductCard from '../components/ui/ProductCard';
import Navbar from '../components/layout/Navbar';
import Loading from '../components/ui/Loading';
import EmptyState from '../components/ui/EmptyState';
import Footer from '../components/layout/Footer';
import { useLocation } from 'react-router-dom';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        search: '',
        categoryId: '',
        minPrice: '',
        maxPrice: '',
        page: 0,
        size: 12,
        sortBy: 'createdAt',
        sortDir: 'desc',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        if (categoryParam) {
            setFilters(prev => {
                const newFilters = { ...prev, categoryId: categoryParam, page: 0 };
                // Forzar fetch inmediatamente con los nuevos filtros
                fetchProductsWithFilters(newFilters);
                return newFilters;
            });
        }
    }, [location.search]);

    const fetchCategories = async () => {
        try {
            const response = await categoryApi.getAll();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        await fetchProductsWithFilters(filters);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value, page: 0 });
    };

    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage });
    };

    const fetchProductsWithFilters = async (filterParams) => {
        try {
            const params = {};
            if (filterParams.search) params.search = filterParams.search;
            if (filterParams.categoryId) params.categoryId = filterParams.categoryId;
            if (filterParams.minPrice) params.minPrice = filterParams.minPrice;
            if (filterParams.maxPrice) params.maxPrice = filterParams.maxPrice;
            params.page = filterParams.page;
            params.size = filterParams.size;
            params.sortBy = filterParams.sortBy;
            params.sortDir = filterParams.sortDir;

            const response = await productApi.search(params);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="fw-bold mb-4">Productos</h2>

                {/* Filtros */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    name="search"
                                    className="form-control"
                                    placeholder="🔍 Buscar productos..."
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <div className="col-md-2">
                                <select
                                    name="categoryId"
                                    className="form-select"
                                    value={filters.categoryId}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="number"
                                    name="minPrice"
                                    className="form-control"
                                    placeholder="Precio mín."
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="number"
                                    name="maxPrice"
                                    className="form-control"
                                    placeholder="Precio máx."
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <div className="col-md-2">
                                <select
                                    name="sortBy"
                                    className="form-select"
                                    value={filters.sortBy}
                                    onChange={handleFilterChange}
                                >
                                    <option value="createdAt">Más recientes</option>
                                    <option value="price">Precio</option>
                                    <option value="name">Nombre</option>
                                    <option value="averageRating">Valoración</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Productos */}
                {loading ? (
                    <Loading text="Cargando productos..." />
                ) : products.length === 0 ? (
                    <EmptyState
                        icon="🔍"
                        title="No se encontraron productos"
                        message="Prueba con otros filtros de busqueda"
                        actionLabel="Ver todos los productos"
                        onAction={() => setFilters({ ...filters, search: '', categoryId: '', minPrice: '', maxPrice: '' })}
                    />
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4" style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                        {products.map(product => (
                            <div key={product.id} className="col">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
                {/* Paginación */}
                {totalPages > 1 && (
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${filters.page === 0 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(filters.page - 1)}
                                >
                                    Anterior
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, i) => (
                                <li key={i} className={`page-item ${filters.page === i ? 'active' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(i)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${filters.page === totalPages - 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(filters.page + 1)}
                                >
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
            <Footer /> 
        </>
    );
}