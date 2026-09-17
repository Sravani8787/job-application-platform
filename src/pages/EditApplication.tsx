import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
  Application,
  ApplicationStatus,
} from "../types/Application";
import {
  getApplications,
  updateApplication,
} from "../services/applicationService";

function EditApplication() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [application, setApplication] =
    useState<Application | null>(null);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] =
    useState<ApplicationStatus>("Applied");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const loadApplication = async () => {
    if (!id) {
      setError("Invalid application ID.");
      setLoading(false);
      return;
    }

    try {
      const applications = await getApplications();

      const foundApplication = applications.find(
        (application) =>
          String(application.id) === String(id)
      );

      if (!foundApplication) {
        setError("Application not found.");
        return;
      }

      setApplication(foundApplication);

      setCompany(foundApplication.company);
      setPosition(foundApplication.position);
      setLocation(foundApplication.location);
      setDateApplied(foundApplication.dateApplied);
      setStatus(foundApplication.status);
    } catch (error) {
      console.error(
        "Error loading application:",
        error
      );

      setError(
        "Unable to load this application."
      );
    } finally {
      setLoading(false);
    }
  };

  loadApplication();
}, [id]);


  const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
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

  if (!id) {
    setError("Application ID is missing.");
    return;
  }

  try {
    setLoading(true);

    await updateApplication(id, {
      company: company.trim(),
      position: position.trim(),
      location: location.trim(),
      dateApplied,
      status,
    });

    navigate("/applications");
  } catch (error) {
    console.error("Error updating application:", error);
    setError("Unable to update application.");
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="add-application-page">
        <div className="form-card">
          <h2>Loading application...</h2>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="add-application-page">
        <div className="form-card">
          <h2>Application not found</h2>

          <button
            type="button"
            className="cancel-button"
            onClick={() =>
              navigate("/applications")
            }
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-application-page">
      <div className="add-application-heading">
        <div>
          <h1>Edit Application</h1>

          <p>
            Update the details of your job application.
          </p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="company">
              Company
            </label>

            <input
              id="company"
              type="text"
              value={company}
              onChange={(event) =>
                setCompany(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">
              Position
            </label>

            <input
              id="position"
              type="text"
              value={position}
              onChange={(event) =>
                setPosition(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateApplied">
              Date Applied
            </label>

            <input
              id="dateApplied"
              type="date"
              value={dateApplied}
              onChange={(event) =>
                setDateApplied(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as ApplicationStatus
                )
              }
            >
              <option value="Applied">
                Applied
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Offer">
                Offer
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() =>
                navigate("/applications")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
            >
              Update Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditApplication;