import { NavLink, Outlet, useNavigate } from "react-router-dom";


function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          JobTrack
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">▦</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/applications"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">▤</span>
            Applications
          </NavLink>

          <NavLink
            to="/applications/add"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">＋</span>
            Add Job
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">⚙</span>
            Settings
          </NavLink>

          <button
            type="button"
            className="nav-link logout-button"
            onClick={handleLogout}
          >
            <span className="nav-icon">↪</span>
            Logout
          </button>
        </nav>
      </aside>

      <div className="main-area">
        <header className="top-header">
          <span>Job Application Management</span>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;