import { Routes, Route } from "react-router-dom";
import AboutUs from "./aboutUs/AboutUs";
import Cart from "./cart/Cart";
import Blog from "./blog/Blog";
import ArticleView from "./blog/ArticleView";
import Contacts from "./contacts/Contacts";
import Home from "./home/Home";
import Categories from "./categories/Categories";
import Donation from "./categories/Donation";
import Clothing from "./categories/Clothing";
import Auction from "./categories/Auction";
import CustomerLogIn from "./adminRoutes/customerLogin/CustomerLogIn";
import AdminLogIn from "./adminRoutes/adminLogin/AdminLogIn";
import AdminPage from "./adminRoutes/adminPage/AdminPage";
import CustomerPage from "./adminRoutes/customerPage/CustomerPage";
import CustomerRegistration from "./adminRoutes/CustomerRegistration";
import AdminRegistration from "./adminRoutes/AdminRegistration";
import Favorites from "./favorites/Favorites";
import DeliveryPayment from "./deliveryPayment/DeliveryPayment";
import Returns from "./returns/Returns";
import PrivacyPolicy from "./privacyPolicy/PrivacyPolicy";
import ProductPage from "./productPage/ProductPage";
import SearchProducts from "./searchProducts/SearchProducts";
import { withAuth } from "./withAuth";

const ProtectedComponentForCustomer = withAuth(CustomerPage, "/log-in", false, true);
const ProtectedComponentForAdmin = withAuth(AdminPage, "/admin", true);


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/military-clothing" element={<Clothing />} />
      <Route path="/categories/charity-auction" element={<Auction />} />
      <Route path="/categories/donation" element={<Donation />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/news/:customId" element={<ArticleView />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/delivery-payment" element={<DeliveryPayment />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/product/:itemNo" element={<ProductPage />} />
      <Route path="/log-in" element={<CustomerLogIn />} />
      <Route path="/account" element={<ProtectedComponentForCustomer />} />
      <Route path="/admin" element={<AdminLogIn />} />
      <Route path="/adm-page" element={<ProtectedComponentForAdmin />} />
      <Route path="/registration" element={<CustomerRegistration />} />
      <Route path="/adm-registration" element={<AdminRegistration />} />
      <Route path="/products-search" element={<SearchProducts />} />
    </Routes>
  );
}

export default AppRoutes;
