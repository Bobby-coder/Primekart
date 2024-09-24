import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import CategoryNavbar from "./components/home/CategoryNavbar";
import SearchPage from "./pages/SearchPage";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerificationPage from "./pages/VerificationPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserDetails } from "./store/features/auth/authSlice";
import MyAccountPage from "./pages/MyAccountPage";
import { fetchCart } from "./store/features/cart/cartSlice";
import { fetchWishlist } from "./store/features/wishlist/wishlistSlice";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Protected from "./components/Protected";

function App() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  // Whenever app mounts, initialize user details, cart and wishlist only if it is logged in
  useEffect(() => {
    if (name) {
      dispatch(fetchUserDetails());
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, name]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <CategoryNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:name/" element={<ProductsPage />} />
        <Route
          path="/category/:name/:productId"
          element={<ProductDetailPage />}
        />
        <Route
          path="/cart"
          element={
            <Protected>
              <CartPage />
            </Protected>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Protected>
              <WishlistPage />
            </Protected>
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route
          path="/my-account"
          element={
            <Protected>
              <MyAccountPage />
            </Protected>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
