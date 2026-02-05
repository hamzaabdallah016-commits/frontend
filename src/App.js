import { Route, Routes } from 'react-router-dom';
import Layout from "./components/layout/Layout.jsx";
import NotFoundPage from './pages/client/notFound/NotFound.jsx';
import PrivateRoute from './components/privateRoute/PrivateRoute.jsx';
import PersonsPage from './pages/admin/person/Persons.jsx';
import './App.css';
import CategoriesPage from './pages/admin/categories/Category.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="*" element={<NotFoundPage />} />

        {/* 🔐 Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<h1>Home Page</h1>} />
          <Route path="/admin/persons" element={<PersonsPage />} />
           <Route path="/admin/categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
