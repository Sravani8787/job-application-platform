import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  Application,
  ApplicationStatus,
} from "../types/Application";
import {
  getApplications,
  deleteApplication,
} from "../services/applicationService";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>(
    []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<ApplicationStatus | "All">("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load applications from JSON Server
  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getApplications();
        setApplications(data);
      } catch (err) {
        console.error("Error loading applications:", err);
        setError("Unable to load applications.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  // Search + status filtering
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        search === "" ||
        application.company.toLowerCase().includes(search) ||
        application.position.toLowerCase().includes(search) ||
        application.location.toLowerCase().includes(search) ||
        application.status.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  // Delete application
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteApplication(id);

      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) => application.id !== id
        )
      );
    } catch (err) {
      console.error("Error deleting application:", err);
      setError("Unable to delete application.");
    }
  };

  // Format date
  const formatDate = (date: string) => {
    if (!date) {
      return "-";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return date;
    }

    return formattedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="applications-page">
      <div className="applications-header">
        <div>
          <h1>Applications</h1>

          <p>
            Manage and track all your job applications.
          </p>
        </div>

        <button
          className="add-application-button"
          onClick={() => navigate("/add-application")}
        >
          + Add Application
        </button>
      </div>

      <div className="applications-card">
        {/* Search and filter */}
        <div className="applications-filters">
          <input
            type="text"
            className="applications-search"
            placeholder="Search company, position, location or status..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          <select
            className="applications-status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | ApplicationStatus
                  | "All"
              )
            }
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="applications-error">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="applications-message">
            Loading applications...
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="applications-message">
            No applications found.
          </div>
        ) : (
          <div className="applications-table-wrapper">
            <div className="applications-table">
              {/* Table Header */}
              <div className="applications-table-header">
                <div>COMPANY</div>
                <div>POSITION</div>
                <div>LOCATION</div>
                <div>DATE APPLIED</div>
                <div>STATUS</div>
                <div>ACTION</div>
              </div>

              {/* Table Rows */}
              {filteredApplications.map((application) => (
                <div
                  className="applications-table-row"
                  key={application.id}
                >
                  <div className="company-name">
                    {application.company}
                  </div>

                  <div>
                    {application.position}
                  </div>

                  <div>
                    {application.location}
                  </div>

                  <div>
                    {formatDate(application.dateApplied)}
                  </div>

                  <div>
                    <span
                      className={`status-badge status-${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="application-actions">
                    <button
                      className="edit-button"
                      onClick={() =>
                        navigate(
                          `/applications/${application.id}/edit`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(application.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;