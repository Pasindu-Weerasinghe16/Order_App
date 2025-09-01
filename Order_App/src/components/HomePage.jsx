import NavBar from './NavBar'
import HeroSection from './HeroSection'
import OffersSection from './OffersSection'
import PopularCategories from './PopularCategories'
import CustomerReviews from './CustomerReviews'
import DeliveryInfoSection from './DeliveryInfoSection'
import Footer from './Footer'

const HomePage = () => {
  return (
  <div className="relative  w-full">
      <NavBar />
      <HeroSection />
      <OffersSection />
      <PopularCategories />
      <CustomerReviews />
      <DeliveryInfoSection />
      <Footer />
    </div>
  )
}

export default HomePage