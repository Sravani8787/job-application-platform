import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchApplications,
  removeApplication,
} from "../store/applicationsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function ApplicationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items: applications, loading, error } = useAppSelector(
    (state) => state.applications
  );

  const application = applications.find((item) => item.id === id);

  useEffect(() => {
    if (!application && applications.length === 0) {
      dispatch(fetchApplications());
    }
  }, [application, applications.length, dispatch]);

  const handleDelete = async () => {
    if (!application) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the application for ${application.company}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(removeApplication(application.id)).unwrap();
      navigate("/applications");
    } catch {
      // Error is displayed through the Redux error state.
    }
  };

  if (loading && !application) {
    return (
      <div className="page-loading">
        Loading application details...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="page-error">
        <h2>Application Not Found</h2>

        <p>
          {error ||
            "The application you are looking for does not exist."}
        </p>

        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/applications")}
        >
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="application-details-page">
      {/* Header */}
      <div className="details-header">
        <div>
          <h1>Application Details</h1>
          <p>
            View information about your job application.
          </p>
        </div>

        <div className="details-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/applications")}
          >
            Back
          </button>

          <button
            type="button"
            className="settings-action-button"
            onClick={() =>
              navigate(`/applications/edit/${application.id}`)
            }
          >
            Edit
          </button>

          <button
            type="button"
            className="settings-logout-button"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Job Information */}
      <section className="details-card">
        <div className="details-card-header">
          <h2>Job Information</h2>
          <p>Details about the position and application.</p>
        </div>

        <div className="details-list">
          <div className="details-row">
            <span className="details-label">Company</span>
            <span className="details-value">
              {application.company}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">Job Title</span>
            <span className="details-value">
              {application.jobTitle}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">Location</span>
            <span className="details-value">
              {application.location}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">Salary</span>
            <span className="details-value">
              {application.salary
                ? `£${application.salary.toLocaleString()}`
                : "Not specified"}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">Date Applied</span>
            <span className="details-value">
              {application.dateApplied
                ? new Date(
                    application.dateApplied
                  ).toLocaleDateString("en-GB")
                : "Not specified"}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">Status</span>

            <span
              className={`status-badge status-${application.status
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {application.status}
            </span>
          </div>

          {application.jobUrl && (
            <div className="details-row">
              <span className="details-label">
                Job URL
              </span>

              <span className="details-value">
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Job Posting
                </a>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Recruiter Information */}
      <section className="details-card">
        <div className="details-card-header">
          <h2>Recruiter Information</h2>
          <p>Contact information for the recruiter.</p>
        </div>

        <div className="details-list">
          <div className="details-row">
            <span className="details-label">
              Recruiter Name
            </span>

            <span className="details-value">
              {application.recruiterName || "Not specified"}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">
              Recruiter Email
            </span>

            <span className="details-value">
              {application.recruiterEmail || "Not specified"}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">
              Interview Date
            </span>

            <span className="details-value">
              {application.interviewDate
                ? new Date(
                    application.interviewDate
                  ).toLocaleString("en-GB")
                : "Not scheduled"}
            </span>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="details-card">
        <div className="details-card-header">
          <h2>Notes</h2>
          <p>Additional information about this application.</p>
        </div>

        <div className="application-notes">
          {application.notes ? (
            <p>{application.notes}</p>
          ) : (
            <p className="details-empty">
              No notes added for this application.
            </p>
          )}
        </div>
      </section>

      {/* Footer Actions */}
      <div className="details-footer">
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/applications")}
        >
          Back to Applications
        </button>

        <button
          type="button"
          className="settings-action-button"
          onClick={() =>
            navigate(`/applications/edit/${application.id}`)
          }
        >
          Edit Application
        </button>
      </div>
    </div>
  );
}

export default ApplicationDetails;