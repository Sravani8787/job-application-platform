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
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && applications.length === 0) {
    return (
      <div className="dashboard-page">
        <div className="page-error">
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
      <div className="dashboard-heading">
        <div>
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
          + Add Application
        </button>
      </div>

      {/* Main Statistics */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-label">
            Total Applications
          </span>

          <strong className="stat-value">
            {stats.total}
          </strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Applied
          </span>

          <strong className="stat-value">
            {stats.applied}
          </strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Interviews
          </span>

          <strong className="stat-value">
            {stats.interviews}
          </strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Offers
          </span>

          <strong className="stat-value">
            {stats.offers}
          </strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Rejected
          </span>

          <strong className="stat-value">
            {stats.rejected}
          </strong>
        </div>
      </div>

      {/* Secondary Statistics */}
      <div className="dashboard-secondary-stats">
        <div className="dashboard-info-card">
          <h3>Applications This Month</h3>

          <strong>
            {applicationsThisMonth}
          </strong>
        </div>

        <div className="dashboard-info-card">
          <h3>Offer Conversion</h3>

          <strong>
            {offerConversionRate}%
          </strong>
        </div>
      </div>

      {/* Status Breakdown */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Applications by Status</h2>

            <p>
              Current distribution of your applications.
            </p>
          </div>
        </div>

        <div className="status-breakdown">
          {statusCounts.map((item) => (
            <div
              className="status-breakdown-row"
              key={item.status}
            >
              <span>
                {item.status}
              </span>

              <strong>
                {item.count}
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Interviews */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Upcoming Interviews</h2>

            <p>
              Your next scheduled interviews.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/applications")
            }
          >
            View Applications
          </button>
        </div>

        {upcomingInterviews.length === 0 ? (
          <div className="empty-state">
            <p>
              No upcoming interviews scheduled.
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
                  <div>
                    <strong>
                      {application.company}
                    </strong>

                    <p>
                      {application.jobTitle}
                    </p>
                  </div>

                  <div>
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
  );
}

export default Dashboard;