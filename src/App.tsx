import "modern-normalize";
import "./index.css";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import NotehubPage from "./pages/NotehubPage";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <nav className="app-nav" aria-label="Primary navigation">
          <NavLink
            className={({ isActive }) =>
              isActive ? "app-nav__link app-nav__link--active" : "app-nav__link"
            }
            to="/movies"
          >
            Movies
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "app-nav__link app-nav__link--active" : "app-nav__link"
            }
            to="/notuhubes"
          >
            Notehub
          </NavLink>
        </nav>
      </header>

      <main className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/notuhubes" element={<NotehubPage />} />
          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
