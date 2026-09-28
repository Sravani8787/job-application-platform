import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchApplications,
  removeApplication,
} from "../store/applicationsSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

import {APPLICATION_STATUSES,} from "../types/Application";

function Applications() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    items: applications,
    loading,
    error,
  } = useAppSelector((state) => state.applications);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [sortBy, setSortBy] = useState<
     "newest" | "oldest" | "company-asc" | "company-desc"
  >("newest");

  /*
   * Load applications from Redux/API
   */
  useEffect(() => {
    if (applications.length === 0) {
      dispatch(fetchApplications());
    }
  }, [dispatch, applications.length]);

  /*
   * Get unique companies
   */
  const companies = useMemo(() => {
     return [...new Set(applications.map((app) => app.company))].sort();
  }, [applications]);

  /*
   * Get unique locations
   */
  const locations = useMemo(() => {
     return [...new Set(applications.map((app) => app.location))].sort();
  }, [applications]);

  /*
   * Filter and sort applications
   */
  const filteredApplications = useMemo(() => {
    const filtered = applications.filter((application) => {
        const search = searchTerm.trim().toLowerCase();

        const matchesSearch =
          search === "" ||
          application.company.toLowerCase().includes(search) ||
          application.jobTitle.toLowerCase().includes(search) ||
          application.location.toLowerCase().includes(search) ||
          application.status.toLowerCase().includes(search);

        const matchesStatus =
          statusFilter === "All" ||
          application.status === statusFilter;

        const matchesCompany =
          companyFilter === "All" ||
          application.company === companyFilter;

        const matchesLocation =
          locationFilter === "All" ||
          application.location === locationFilter;

        const matchesDate =
          dateFilter === "" ||
          application.dateApplied === dateFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesCompany &&
          matchesLocation &&
          matchesDate
        );
      });

    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.dateApplied).getTime() -
          new Date(a.dateApplied).getTime()
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.dateApplied).getTime() -
          new Date(b.dateApplied).getTime()
        );
      }

      if (sortBy === "company-asc") {
        return a.company.localeCompare(b.company);
      }

      return b.company.localeCompare(a.company);
    });
  }, [
    applications,
    searchTerm,
    statusFilter,
    companyFilter,
    locationFilter,
    dateFilter,
    sortBy,
  ]);

  /*
   * Delete application
   */
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }

    await dispatch(removeApplication(id));
  };

  /*
   * Clear all filters
   */
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCompanyFilter("All");
    setLocationFilter("All");
    setDateFilter("");
    setSortBy("newest");
  };

  /*
   * Format date for UK display
   */
  const formatDate = (date: string) => {
    if (!date) {
      return "-";
    }

     return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /*
   * Loading state
   */
  if (loading && applications.length === 0) {
    return (
      <div className="applications-page">
        <div className="page-loading">

          <div className="applications-spinner"></div>

          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  /*
   * Error state
   */
   if (error && applications.length === 0) {
    return (
      <div className="applications-page">
        <div className="applications-error">

          <div className="applications-error-icon">
            !
          </div>

          <h2>Unable to load applications</h2>
          <p>{error}</p>

          <button
            type="button"
            onClick={() => dispatch(fetchApplications())}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-page">

      {/* Decorative background */}
      <div className="applications-bg-shape applications-bg-one"></div>
      <div className="applications-bg-shape applications-bg-two"></div>

      {/* Page Header */}
      <div className="applications-heading">

        <div className="applications-heading-content">

          <div className="applications-page-icon">
            J
          </div>

          <div>
            <h1>Applications</h1>
            <p>
              Track and manage your job applications.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="add-application-button"
          onClick={() => navigate("/applications/add")}
        >
          <span className="add-button-icon">
            +
          </span>

          Add Application
        </button>
      </div>

      {/* Filters */}
      <div className="applications-filters">

        {/* Search */}
        <div className="filter-group search-filter">
          <label htmlFor="search">
            Search
          </label>

          <div className="application-search-wrapper">

            <span className="application-search-icon">
              ⌕
            </span>

            <input
              id="search"
              type="text"
              placeholder="Search company, job title..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>
        </div>

        {/* Status */}
        <div className="filter-group">
          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All statuses</option>

            {APPLICATION_STATUSES.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
          </select>
        </div>

        {/* Company */}
        <div className="filter-group">
          <label htmlFor="company">
            Company
          </label>

          <select
            id="company"
            value={companyFilter}
            onChange={(event) =>
              setCompanyFilter(event.target.value)
            }
          >
            <option value="All">
              All companies
            </option>

            {companies.map((company) => (
              <option
                key={company}
                value={company}
              >
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="filter-group">
          <label htmlFor="location">
            Location
          </label>

          <select
            id="location"
            value={locationFilter}
            onChange={(event) =>
              setLocationFilter(event.target.value)
            }
          >
            <option value="All">
              All locations
            </option>

            {locations.map((location) => (
              <option
                key={location}
                value={location}
              >
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="filter-group">
          <label htmlFor="date">
            Date Applied
          </label>

          <input
            id="date"
            type="date"
            value={dateFilter}
            onChange={(event) =>
              setDateFilter(event.target.value)
            }
          />
        </div>

        {/* Sort */}
        <div className="filter-group">
          <label htmlFor="sort">
            Sort By
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value as
                  | "newest"
                  | "oldest"
                  | "company-asc"
                  | "company-desc"
              )
            }
          >
            <option value="newest">
              Newest first
            </option>

            <option value="oldest">
              Oldest first
            </option>

            <option value="company-asc">
              Company A-Z
            </option>

            <option value="company-desc">
              Company Z-A
            </option>
          </select>
        </div>

        {/* Clear Filters */}
        <button
          type="button"
          className="clear-filters-button"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* Results Summary */}
      <div className="applications-summary">
        <span>
          Showing{" "}
          <strong>
            {filteredApplications.length}
          </strong>{" "}
          of{" "}
          <strong>
            {applications.length}
          </strong>{" "}
          applications
        </span>
      </div>

      {/* Background error while data exists */}
      {error &&
        applications.length > 0 && (
          <div
            className="applications-inline-error"
            role="alert"
          >
            {error}
          </div>
        )}

      {/* Empty State */}
      {filteredApplications.length === 0 ? (
        <div className="applications-empty-state">

          <div className="empty-state-icon">           📋
          </div>
          <h2>No applications found</h2>

          <p>
            Try changing your filters or add a new
             application.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/applications/add")
            }
          >
            Add Application
          </button>
        </div>
      ) : (
        /* Applications Table */
        <div className="applications-table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map(
                (application) => (

                  <tr
                    key={application.id}
                  >

                    {/* Company */}
                    <td>

                      <div className="company-cell">

                        <div className="company-avatar">
                          {application.company
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {application.company}
                        </strong>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td>
                      <span className="job-title-cell">
                        {application.jobTitle}
                      </span>
                    </td>

                    {/* Location */}
                    <td>
                      <span className="location-cell">
                        {application.location}
                      </span>
                    </td>

                    {/* Date */}
                    <td>
                      <span className="date-cell">
                        {formatDate(
                          application.dateApplied
                        )}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge status-${application.status
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="application-actions">
                        <button
                          type="button"
                          className="view-action"
                          onClick={() =>
                            navigate(
                              `/applications/${application.id}`
                            )
                          }
                        >
                          View
                        </button>

                        <button
                          type="button"
                          className="edit-action"
                          onClick={() =>
                            navigate(
                              `/applications/edit/${application.id}`
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-action"
                          onClick={() =>
                            handleDelete(
                              application.id
                            )
                          }
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Applications;