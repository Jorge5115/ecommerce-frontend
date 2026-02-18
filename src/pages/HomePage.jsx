import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/ui/HeroSection';
import FeaturedProducts from '../components/ui/FeaturedProducts';
import StatsSection from '../components/ui/StatsSection';
import CategoriesSection from '../components/ui/CategoriesSection';

export default function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <StatsSection />
            <CategoriesSection />
            <FeaturedProducts />
            <Footer />
        </>
    );
}