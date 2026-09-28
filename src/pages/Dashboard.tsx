import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchApplications,
} from "../store/applicationsSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    items: applications,
    loading,
    error,
  } = useAppSelector((state) => state.applications);

  useEffect(() => {
    if (applications.length === 0) {
      dispatch(fetchApplications());
    }
  }, [dispatch, applications.length]);

  const stats = useMemo(() => {
    const total = applications.length;

    const applied = applications.filter(
      (application) => application.status === "Applied"
    ).length;

    const interviews = applications.filter(
      (application) =>
        application.status === "Interview" ||
        application.status === "Technical Interview" ||
        application.status === "Final Interview"
    ).length;

    const offers = applications.filter(
      (application) => application.status === "Offer"
    ).length;

    const rejected = applications.filter(
      (application) => application.status === "Rejected"
    ).length;

    return {
      total,
      applied,
      interviews,
      offers,
      rejected,
    };
  }, [applications]);

  const applicationsThisMonth = useMemo(() => {
    const now = new Date();

    return applications.filter((application) => {
      const date = new Date(application.dateApplied);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;
  }, [applications]);

  const upcomingInterviews = useMemo(() => {
    const now = new Date();

    return applications
      .filter((application) => {
        if (!application.interviewDate) {
          return false;
        }

        return new Date(application.interviewDate) >= now;
      })
      .sort(
        (a, b) =>
          new Date(a.interviewDate!).getTime() -
          new Date(b.interviewDate!).getTime()
      )
      .slice(0, 5);
  }, [applications]);

  const offerConversionRate =
    stats.total > 0
      ? Math.round((stats.offers / stats.total) * 100)
      : 0;

  const statusCounts = useMemo(() => {
    const statuses = [
      "Saved",
      "Applied",
      "Screening",
      "Interview",
      "Technical Interview",
      "Final Interview",
      "Offer",
      "Rejected",
      "Withdrawn",
    ];

    return statuses.map((status) => ({
      status,
      count: applications.filter(
        (application) => application.status === status
      ).length,
    }));
  }, [applications]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading && applications.length === 0) {
    return (
      <div className="dashboard-page">
        <div className="page-loading">
          <div className="dashboard-loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && applications.length === 0) {
    return (
      <div className="dashboard-page">
        <div className="page-error">
          <div className="page-error-icon">!</div>

          <h2>Unable to load dashboard</h2>

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
    <div className="dashboard-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="dashboard-heading">
        <div>
          <span className="dashboard-eyebrow">
            JOB APPLICATION TRACKER
          </span>
          <h1>Dashboard</h1>

          <p>
            Overview of your job application activity.
          </p>
        </div>

        <button
          type="button"
          className="add-application-button"
          onClick={() => navigate("/applications/add")}
        >
          <span className="button-plus">+</span>
          Add Application
        </button>
      </div>


      {/* =====================================================
          MAIN STATISTICS
          ===================================================== */}

      <div className="dashboard-stats">

        {/* Total */}
        <div className="stat-card stat-total">

          <div className="stat-card-top">
            <div className="stat-icon">
              ▣
            </div>

            <span className="stat-trend">
              All
            </span>
          </div>

          <div>
            <span className="stat-label">
              Total Applications
            </span>

            <strong className="stat-value">
              {stats.total}
            </strong>
          </div>

        </div>


        {/* Applied */}
        <div className="stat-card stat-applied">

          <div className="stat-card-top">
            <div className="stat-icon">
              ↗
            </div>

            <span className="stat-trend">
              Active
            </span>
          </div>

          <div>
            <span className="stat-label">
              Applied
            </span>

            <strong className="stat-value">
              {stats.applied}
            </strong>
          </div>

        </div>


        {/* Interviews */}
        <div className="stat-card stat-interviews">

          <div className="stat-card-top">
            <div className="stat-icon">
              ◷
            </div>

            <span className="stat-trend">
              Scheduled
            </span>
          </div>

          <div>
            <span className="stat-label">
              Interviews
            </span>

            <strong className="stat-value">
              {stats.interviews}
            </strong>
          </div>

        </div>


        {/* Offers */}
        <div className="stat-card stat-offers">

          <div className="stat-card-top">
            <div className="stat-icon">
              ✓
            </div>

            <span className="stat-trend">
              Received
            </span>
          </div>

          <div>
            <span className="stat-label">
              Offers
            </span>

            <strong className="stat-value">
              {stats.offers}
            </strong>
          </div>

        </div>


        {/* Rejected */}
        <div className="stat-card stat-rejected">

          <div className="stat-card-top">
            <div className="stat-icon">
              ×
            </div>

            <span className="stat-trend">
              Closed
            </span>
          </div>

          <div>
            <span className="stat-label">
              Rejected
            </span>

            <strong className="stat-value">
              {stats.rejected}
            </strong>
          </div>
        </div>
      </div>


      {/* =====================================================
          SECONDARY STATISTICS
          ===================================================== */}

      <div className="dashboard-secondary-stats">

        <div className="dashboard-info-card">
          <div className="info-card-content">
            <span className="info-card-label">
              Applications This Month
            </span>

            <strong>
              {applicationsThisMonth}
            </strong>
          </div>

          <div className="info-card-icon">
            ▣
          </div>

        </div>

        <div className="dashboard-info-card">
          <div className="info-card-content">
            <span className="info-card-label">
              Offer Conversion
            </span>

            <strong>
              {offerConversionRate}%
            </strong>
          </div>

          <div className="conversion-circle">
            {offerConversionRate}%
          </div>
        </div>
      </div>


      {/* =====================================================
          MAIN DASHBOARD GRID
          ===================================================== */}

      <div className="dashboard-main-grid">


        {/* ===================================================
            STATUS BREAKDOWN
            =================================================== */}

        <section className="dashboard-section status-section">

          <div className="section-heading">

            <div>
              <h2>
                Applications by Status
              </h2>

              <p>
                Current distribution of your applications.
              </p>
            </div>

            <span className="section-count">
              {applications.length} Total
            </span>

          </div>

          <div className="status-breakdown">
            {statusCounts.map((item) => {

              const percentage =
                stats.total > 0
                  ? Math.round(
                      (item.count / stats.total) * 100
                    )
                  : 0;

              return (
                <div
                  className="status-breakdown-row"
                  key={item.status}
                >

                  <div className="status-row-info">

                    <span
                      className={`status-dot status-dot-${item.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    ></span>

                    <span className="status-name">
                      {item.status}
                    </span>

                  </div>


                  <div className="status-row-right">

                    <div className="status-progress">
                      <div
                        className="status-progress-bar"
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>

                    <strong>
                      {item.count}
                    </strong>

                  </div>

                </div>
              );
            })}
          </div>
        </section>


        {/* ===================================================
            UPCOMING INTERVIEWS
            =================================================== */}

        <section className="dashboard-section interviews-section">
          <div className="section-heading">
            <div>
              <h2>Upcoming Interviews</h2>

              <p>
                Your next scheduled interviews.
              </p>
            </div>

            <button
              type="button"
              className="view-all-button"
              onClick={() =>
                navigate("/applications")
              }
            >
              View All
            </button>
          </div>

          {upcomingInterviews.length === 0 ? (
            <div className="empty-state">

              <div className="empty-state-icon">
                ◷
              </div>

              <h3> No upcoming interviews</h3>

              <p>
                Your scheduled interviews will appear here.
              </p>
            </div>
          ) : (
            <div className="upcoming-interviews">
              {upcomingInterviews.map(
                (application) => (
                  <div
                    className="interview-card"
                    key={application.id}
                  >

                    <div className="interview-date-box">

                      <span>
                        {new Date(
                          application.interviewDate!
                        ).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                          }
                        )}
                      </span>

                      <small>
                        {new Date(
                          application.interviewDate!
                        ).toLocaleDateString(
                          "en-GB",
                          {
                            month: "short",
                          }
                        )}
                      </small>

                    </div>


                    <div className="interview-details">

                      <strong>
                        {application.company}
                      </strong>

                      <p>
                        {application.jobTitle}
                      </p>
                    </div>

                    <div className="interview-action">
                      <span>
                        {formatDate(
                          application.interviewDate!
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/applications/${application.id}`
                          )
                        }
                      >
                        View
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;