import { useEffect } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ApplicationForm from "../components/forms/ApplicationForm";
import type {
  Application,
  CreateApplicationInput,
} from "../types/Application";

import {
  editApplication,
  fetchApplications,
} from "../store/applicationsSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

function EditApplication() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const {
    items: applications,
    loading,
    error,
  } = useAppSelector(
    (state) => state.applications
  );

  /*
   * Derive the application directly
   * from Redux instead of duplicating it
   * in local component state.
   */
  const application: Application | null =
    applications.find(
      (item) => item.id === id
    ) ?? null;

  /*
   * If applications haven't been loaded yet,
   * fetch them from the API.
   */
  useEffect(() => {
    if (!id) {
      return;
    }

    if (applications.length === 0) {
      dispatch(fetchApplications());
    }
  }, [
    id,
    applications.length,
    dispatch,
  ]);

  /*
   * Update application.
   */
  const handleSubmit = async (
    applicationData: CreateApplicationInput
  ) => {
    if (!application) {
      return;
    }

    try {
      await dispatch(
        editApplication({
          id: application.id,
          application: applicationData,
        })
      ).unwrap();

      navigate("/applications");
    } catch {
      // Error is displayed by ApplicationForm.
    }
  };

  /*
   * Invalid ID.
   */
  if (!id) {
    return (
      <div className="page-error">
        <h2>Invalid application</h2>

        <p>
          No application ID was provided.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/applications")
          }
        >
          Back to Applications
        </button>
      </div>
    );
  }

  /*
   * Loading.
   */
  if (
    loading &&
    applications.length === 0
  ) {
    return (
      <div className="page-loading">
        <p>
          Loading application...
        </p>
      </div>
    );
  }

  /*
   * Application not found.
   */
  if (
    !loading &&
    !application
  ) {
    return (
      <div className="page-error">
        <h2>
          Application not found
        </h2>

        <p>
          {error ||
            "The application you're looking for does not exist."}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/applications")
          }
        >
          Back to Applications
        </button>
      </div>
    );
  }

  /*
   * Prevent rendering before data exists.
   */
  if (!application) {
    return null;
  }

  return (
    <div className="edit-application-page">
      <div className="edit-application-heading">
        <div>
          <h1>
            Edit Application
          </h1>

          <p>
            Update your job application
            details.
          </p>
        </div>
      </div>

      <div className="form-card">
        <ApplicationForm
          initialData={application}
          onSubmit={handleSubmit}
          submitLabel={
            loading
              ? "Updating Application..."
              : "Update Application"
          }
          loading={loading}
          error={error}
        />

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() =>
              navigate("/applications")
            }
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditApplication;
