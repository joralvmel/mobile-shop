import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CartProvider} from "./context/CartContext.tsx";
import ProductListPage from "./pages/ProductListPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import Header from "./components/layout/Header.tsx";

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <div className="app">
                    <Header />
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
