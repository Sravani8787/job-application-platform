import { useNavigate } from "react-router-dom";
import ApplicationForm from "../components/forms/ApplicationForm";
import { addApplication } from "../store/applicationsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { CreateApplicationInput } from "../types/Application";

function AddApplication() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector(
    (state) => state.applications
  );

  const handleSubmit = async (
    application: CreateApplicationInput
  ) => {
    try {
      await dispatch(addApplication(application)).unwrap();
      navigate("/applications");
    } catch {
      // Error is displayed by ApplicationForm.
    }
  };

  return (
    <div className="add-application-page">

      {/* Decorative background */}
      <div className="add-application-bg-shape add-application-bg-one"></div>
      <div className="add-application-bg-shape add-application-bg-two"></div>

      {/* Page Header */}
      <div className="add-application-heading">

        <div className="add-application-title-wrapper">

          <div className="add-application-icon">
            +
          </div>

          <div>
            <h1>Add Application</h1>

            <p>Add a new job application to your tracker.</p>
          </div>

        </div>

        <button
          type="button"
          className="back-to-applications-button"
          onClick={() => navigate("/applications")}
          disabled={loading}
        >
          ← Applications
        </button>

      </div>

      {/* Form Card */}
      <div className="form-card">

        <div className="form-card-header">

          <div>
            <h2>Application Details</h2>

            <p>
              Enter the details of the job application below.
            </p>
          </div>

        </div>

        <div className="application-form-wrapper">

          <ApplicationForm
            onSubmit={handleSubmit}
            submitLabel={
              loading ? "Adding Application..." : "Add Application"
            }
            loading={loading}
            error={error}
          />

        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/applications")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddApplication;