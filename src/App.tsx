import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductListPage from "./pages/ProductListPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<ProductListPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App
