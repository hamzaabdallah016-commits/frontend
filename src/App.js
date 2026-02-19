import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import NotFoundPage from "./pages/client/notFound/NotFound.jsx";
import PersonsPage from "./pages/admin/person/Persons.jsx";
import CategoriesPage from "./pages/admin/categories/Category.jsx";
import ProductsPage from "./pages/admin/products/Product.jsx";
import OrdersPage from "./pages/admin/Order/Orders.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Home Page</h1>} />
          <Route path="admin/persons" element={<PersonsPage />} />
          <Route path="admin/categories" element={<CategoriesPage />} />
          <Route path="admin/products" element={<ProductsPage />} />
          <Route path="admin/orders" element={<OrdersPage />} />

          {/* Not found INSIDE layout */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
