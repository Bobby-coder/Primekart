import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./store/features/cart/cartSlice";
import { fetchWishlist } from "./store/features/wishlist/wishlistSlice";
import { fetchUserDetails } from "./store/features/auth/authSlice";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import CategoryNavbar from "./components/home/CategoryNavbar";
import Protected from "./components/Protected";

// Lazy load page components
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const WishlistPage = React.lazy(() => import("./pages/WishlistPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const VerificationPage = React.lazy(() => import("./pages/VerificationPage"));
const MyAccountPage = React.lazy(() => import("./pages/MyAccountPage"));
const ResetPasswordPage = React.lazy(() => import("./pages/ResetPasswordPage"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));

function App() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  // Whenever app mounts, initialize user details, cart, and wishlist if logged in
  useEffect(() => {
    dispatch(fetchUserDetails());
    if (name) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, name]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <CategoryNavbar />
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
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
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
