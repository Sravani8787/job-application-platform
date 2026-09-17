import { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";
import type { Application } from "../types/Application";

function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getApplications();

        setApplications(data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  if (loading) {
    return (
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        <p className="dashboard-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <h1>Dashboard</h1>
        <p>Job Application Overview</p>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-card">
          <h3>Total Applications</h3>
          <strong>{totalApplications}</strong>
        </div>

        <div className="dashboard-card">
          <h3>Applied</h3>
          <strong>{appliedCount}</strong>
        </div>

        <div className="dashboard-card">
          <h3>Interviews</h3>
          <strong>{interviewCount}</strong>
        </div>

        <div className="dashboard-card">
          <h3>Offers</h3>
          <strong>{offerCount}</strong>
        </div>

        <div className="dashboard-card">
          <h3>Rejected</h3>
          <strong>{rejectedCount}</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;