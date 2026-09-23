import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Settings() {
  const navigate = useNavigate();

  const userEmail =
    localStorage.getItem("userEmail") ||
    "Not available";

  const handleLogout = () => {
    logoutUser();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <div>
          <h1>Settings</h1>

          <p>
            Manage your account and application
            settings.
          </p>
        </div>
      </div>

      {/* Account */}
      <section className="settings-card">
        <div className="settings-card-header">
          <h2>Account</h2>

          <p>
            Information about your JobTrack
            account.
          </p>
        </div>

        <div className="settings-item">
          <div>
            <h3>Email</h3>

            <p className="settings-email">
              {userEmail}
            </p>
          </div>
        </div>

        <div className="settings-divider" />

        <div className="settings-item">
          <div>
            <h3>Authentication</h3>

            <p>
              Your account is currently
              logged in.
            </p>
          </div>

          <button
            type="button"
            className="settings-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </section>

      {/* Application Preferences */}
      <section className="settings-card">
        <div className="settings-card-header">
          <h2>
            Application Preferences
          </h2>

          <p>
            Manage your job application
            tracking workspace.
          </p>
        </div>

        <div className="settings-item">
          <div>
            <h3>
              Job Application Tracking
            </h3>

            <p>
              Manage and track your job
              applications from the
              Applications page.
            </p>
          </div>

          <button
            type="button"
            className="settings-action-button"
            onClick={() =>
              navigate("/applications")
            }
          >
            View Applications
          </button>
        </div>
      </section>

      {/* Application Information */}
      <section className="settings-card">
        <div className="settings-card-header">
          <h2>Application Information</h2>
        </div>

        <div className="settings-item">
          <div>
            <h3>JobTrack</h3>

            <p>
              Job Application Management
            </p>
          </div>

          <span className="settings-version">
            Portfolio Project
          </span>
        </div>
      </section>
    </div>
  );
}

export default Settings;