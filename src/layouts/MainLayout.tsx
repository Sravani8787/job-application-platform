import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">JobTrack</div>

        <nav
          className="sidebar-nav"
          aria-label="Main navigation"
        >
          <NavLink
            to="/dashboard"
            className={getNavClass}
            aria-label="Dashboard"
          >
            <span className="nav-icon" aria-hidden="true">
              ▦
            </span>
            Dashboard
          </NavLink>

          <NavLink
            to="/applications"
            end
            className={getNavClass}
            aria-label="Applications"
          >
            <span className="nav-icon" aria-hidden="true">
              ▤
            </span>
            Applications
          </NavLink>

          <NavLink
            to="/applications/add"
            className={getNavClass}
            aria-label="Add job application"
          >
            <span className="nav-icon" aria-hidden="true">
              +
            </span>
            Add Job
          </NavLink>

          <NavLink
            to="/settings"
            className={getNavClass}
            aria-label="Settings"
          >
            <span className="nav-icon" aria-hidden="true">
              ⚙
            </span>
            Settings
          </NavLink>

          <button
            type="button"
            className="nav-link logout-button"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <span className="nav-icon" aria-hidden="true">
              ↪
            </span>
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