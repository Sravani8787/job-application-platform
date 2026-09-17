import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <h1>Settings</h1>
        <p>Manage your account and application settings.</p>
      </div>

      <div className="settings-card">
        <h2>Account</h2>

        <div className="settings-item">
          <div>
            <h3>Authentication</h3>
            <p>Your account is currently logged in.</p>
          </div>

          <button
            type="button"
            className="settings-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="settings-card">
        <h2>Application Preferences</h2>

        <div className="settings-item">
          <div>
            <h3>Job Application Tracking</h3>
            <p>
              Manage and track your job applications from
              the Applications page.
            </p>
          </div>

          <button
            type="button"
            className="settings-action-button"
            onClick={() => navigate("/applications")}
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;