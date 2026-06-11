import { Routes, Route } from "react-router-dom";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

// Landing
import LandingPage from "../pages/Landing/LandingPage";

// Auth
import UserLogin from "../pages/Auth/UserLogin";
import UserSignup from "../pages/Auth/UserSignup";
import AdminLogin from "../pages/Auth/AdminLogin";

// Admin
import AddBook from "../pages/Admin/AddBook";
import Analytics from "../pages/Admin/Analytics";
import Authors from "../pages/Admin/Authors";
import BorrowRecords from "../pages/Admin/fines";
import Categories from "../pages/Admin/Categories";
import Dashboard from "../pages/Admin/Dashboard";
import EditBook from "../pages/Admin/EditBook";
import ManageBooks from "../pages/Admin/ManageBooks";
import ManageUsers from "../pages/Admin/ManageUsers";
import Publishers from "../pages/Admin/Publishers";
import Settings from "../pages/Admin/Settings";

// User
import UserDashboard from "../pages/User/Dashboard";
import UserProfile from "../pages/User/Profile";
import UserBookDetails from "../pages/User/BookDetails";
import UserSettings from "../pages/User/Settings";
import UserBorrowedBooks from "../pages/User/BorrowedBooks";
import UserBrowseBooks from "../pages/User/BrowseBooks";
import UserRecommendations from "../pages/User/Recommendations";
import UserWishlist from "../pages/User/Wishlist";
import PdfLibrary from "../pages/User/PdfLibrary";

export default function AppRoutes() {
    return (
        <Routes>

            {/* ==================== Landing ==================== */}
            <Route path="/" element={<LandingPage />} />

            {/* ==================== Authentication ==================== */}
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ==================== User Routes ==================== */}

            <Route
                path="/user/dashboard"
                element={
                    <ProtectedRoute>
                        <UserDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/profile"
                element={
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/settings"
                element={
                    <ProtectedRoute>
                        <UserSettings />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/books"
                element={
                    <ProtectedRoute>
                        <UserBrowseBooks />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/book/:id"
                element={
                    <ProtectedRoute>
                        <UserBookDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/borrowed-books"
                element={
                    <ProtectedRoute>
                        <UserBorrowedBooks />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/recommendations"
                element={
                    <ProtectedRoute>
                        <UserRecommendations />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/wishlist"
                element={
                    <ProtectedRoute>
                        <UserWishlist />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user/pdf-library"
                element={
                    <ProtectedRoute>
                        <PdfLibrary />
                    </ProtectedRoute>
                }
            />

            {/* ==================== Admin Routes ==================== */}

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/books"
                element={
                    <ProtectedRoute>
                        <ManageBooks />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/books/add"
                element={
                    <ProtectedRoute>
                        <AddBook />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/books/edit/:id"
                element={
                    <ProtectedRoute>
                        <EditBook />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute>
                        <ManageUsers />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/analytics"
                element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/authors"
                element={
                    <ProtectedRoute>
                        <Authors />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/fines"
                element={
                    <ProtectedRoute>
                        <BorrowRecords />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/categories"
                element={
                    <ProtectedRoute>
                        <Categories />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/publishers"
                element={
                    <ProtectedRoute>
                        <Publishers />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />

            {/* ==================== Test Route ==================== */}

            <Route
                path="/test"
                element={
                    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-5xl font-bold">
                        SmartShelf AI Working
                    </div>
                }
            />

        </Routes>
    );
}