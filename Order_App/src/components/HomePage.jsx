import NavBar from './NavBar'
import HeroSection from './HeroSection'
import OffersSection from './OffersSection'
import PopularCategories from './PopularCategories'
import CustomerReviews from './CustomerReviews'
import DeliveryInfoSection from './DeliveryInfoSection'
import Footer from './Footer'

const HomePage = () => {
  return (
    <div className="w-[1920px] h-[4000px] relative bg-white overflow-hidden">
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