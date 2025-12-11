import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CartProvider} from "@/context/CartContext";
import ProductListPage from "@/pages/ProductListPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import Header from "@/components/layout/Header";
import Breadcrumbs from "@/components/common/Breadcrumbs";

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <div className="app">
                    <Header />
                    <Breadcrumbs />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<ProductListPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                        </Routes>
                    </main>
                </div>
            </CartProvider>
        </BrowserRouter>
    );
}

export default App
