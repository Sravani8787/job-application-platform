import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../services/applicationService";
import type { ApplicationStatus } from "../types/Application";

function AddApplication() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!company.trim()) {
      setError("Company name is required.");
      return;
    }

    if (!position.trim()) {
      setError("Job position is required.");
      return;
    }

    if (!location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!dateApplied) {
      setError("Application date is required.");
      return;
    }

    if (!status) {
      setError("Application status is required.");
      return;
    }

    try {
      setLoading(true);

      const newApplication = {
        company: company.trim(),
        position: position.trim(),
        location: location.trim(),
        dateApplied,
        status,
      };

      await createApplication(newApplication);

      await createApplication(newApplication);

      navigate("/applications");
    } catch (error) {
      console.error("Error creating application:", error);
      setError("Unable to create application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-application-page">
      <div className="add-application-card">
        <h1>Add Application</h1>

        <p className="add-application-subtitle">
          Add a new job application to your tracker.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="company">Company</label>

            <input
              id="company"
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>

            <input
              id="position"
              type="text"
              placeholder="Enter job position"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>

            <input
              id="location"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateApplied">Date Applied</label>

            <input
              id="dateApplied"
              type="date"
              value={dateApplied}
              onChange={(event) => setDateApplied(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ApplicationStatus)
              }
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button type="button" onClick={() => navigate("/applications")}>
              Cancel
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddApplication;
