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
      <div className="add-application-heading">
        <div>
          <h1>Add Application</h1>
          <p>Add a new job application to your tracker.</p>
        </div>
      </div>

      <div className="form-card">
        <ApplicationForm
          onSubmit={handleSubmit}
          submitLabel={
            loading ? "Adding Application..." : "Add Application"
          }
          loading={loading}
          error={error}
        />

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