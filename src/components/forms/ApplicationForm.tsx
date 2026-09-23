import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type {
  Application,
  CreateApplicationInput,
} from "../../types/Application";

import { APPLICATION_STATUSES } from "../../types/Application";

const applicationSchema = z.object({
  company: z.string().trim().min(1, "Company name is required."),

  jobTitle: z.string().trim().min(1, "Job title is required."),

  location: z.string().trim().min(1, "Location is required."),

  jobUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^https?:\/\/.+/i.test(value),
      "Please enter a valid URL."
    ),

  salary: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        (!Number.isNaN(Number(value)) && Number(value) >= 0),
      "Salary must be a valid non-negative number."
    ),

  dateApplied: z.string().min(1, "Application date is required."),

  status: z.enum(APPLICATION_STATUSES),

  recruiterName: z.string().trim(),

  recruiterEmail: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Please enter a valid email address."
    ),

  interviewDate: z.string(),

  notes: z.string().trim(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  initialData?: Application;
  onSubmit: (data: CreateApplicationInput) => Promise<void>;
  submitLabel: string;
  loading?: boolean;
  error?: string | null;
}

function ApplicationForm({
  initialData,
  onSubmit,
  submitLabel,
  loading = false,
  error = null,
}: ApplicationFormProps) {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),

    defaultValues: {
      company: initialData?.company ?? "",
      jobTitle: initialData?.jobTitle ?? "",
      location: initialData?.location ?? "",
      jobUrl: initialData?.jobUrl ?? "",
      salary:
        initialData?.salary !== undefined
          ? String(initialData.salary)
          : "",
      dateApplied: initialData?.dateApplied ?? "",
      status: initialData?.status ?? "Applied",
      recruiterName: initialData?.recruiterName ?? "",
      recruiterEmail: initialData?.recruiterEmail ?? "",
      interviewDate: initialData?.interviewDate ?? "",
      notes: initialData?.notes ?? "",
    },
  });

  useEffect(() => {
    if (!initialData) {
      return;
    }

    reset({
      company: initialData.company,
      jobTitle: initialData.jobTitle,
      location: initialData.location,
      jobUrl: initialData.jobUrl ?? "",
      salary:
        initialData.salary !== undefined
          ? String(initialData.salary)
          : "",
      dateApplied: initialData.dateApplied,
      status: initialData.status,
      recruiterName: initialData.recruiterName ?? "",
      recruiterEmail: initialData.recruiterEmail ?? "",
      interviewDate: initialData.interviewDate ?? "",
      notes: initialData.notes ?? "",
    });
  }, [initialData, reset]);

  const handleFormSubmit = async (
    values: ApplicationFormValues
  ) => {
    setSuccess(false);

    const applicationData: CreateApplicationInput = {
      company: values.company.trim(),
      jobTitle: values.jobTitle.trim(),
      location: values.location.trim(),
      jobUrl: values.jobUrl.trim() || undefined,
      salary:
        values.salary.trim() === ""
          ? undefined
          : Number(values.salary),
      dateApplied: values.dateApplied,
      status: values.status,
      recruiterName:
        values.recruiterName.trim() || undefined,
      recruiterEmail:
        values.recruiterEmail.trim() || undefined,
      interviewDate:
        values.interviewDate || undefined,
      notes: values.notes.trim() || undefined,
    };

    try {
      await onSubmit(applicationData);
      setSuccess(true);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      {/* Server Error */}
      {error && (
        <div
          className="form-error"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div
          className="form-success"
          role="status"
          aria-live="polite"
        >
          Application saved successfully.
        </div>
      )}

      {/* Company */}
      <div className="form-group">
        <label htmlFor="company">
          Company *
        </label>

        <input
          id="company"
          type="text"
          placeholder="e.g. Microsoft"
          disabled={loading}
          aria-invalid={errors.company ? "true" : "false"}
          aria-describedby={
            errors.company ? "company-error" : undefined
          }
          {...register("company")}
        />

        {errors.company && (
          <p
            id="company-error"
            className="field-error"
            role="alert"
          >
            {errors.company.message}
          </p>
        )}
      </div>

      {/* Job Title */}
      <div className="form-group">
        <label htmlFor="jobTitle">
          Job Title *
        </label>

        <input
          id="jobTitle"
          type="text"
          placeholder="e.g. Data Analyst"
          disabled={loading}
          aria-invalid={errors.jobTitle ? "true" : "false"}
          aria-describedby={
            errors.jobTitle ? "jobTitle-error" : undefined
          }
          {...register("jobTitle")}
        />

        {errors.jobTitle && (
          <p
            id="jobTitle-error"
            className="field-error"
            role="alert"
          >
            {errors.jobTitle.message}
          </p>
        )}
      </div>

      {/* Location */}
      <div className="form-group">
        <label htmlFor="location">
          Location *
        </label>

        <input
          id="location"
          type="text"
          placeholder="e.g. London, UK"
          disabled={loading}
          aria-invalid={errors.location ? "true" : "false"}
          aria-describedby={
            errors.location ? "location-error" : undefined
          }
          {...register("location")}
        />

        {errors.location && (
          <p
            id="location-error"
            className="field-error"
            role="alert"
          >
            {errors.location.message}
          </p>
        )}
      </div>

      {/* Job URL */}
      <div className="form-group">
        <label htmlFor="jobUrl">
          Job Posting URL
        </label>

        <input
          id="jobUrl"
          type="url"
          placeholder="https://example.com/job"
          disabled={loading}
          aria-invalid={errors.jobUrl ? "true" : "false"}
          aria-describedby={
            errors.jobUrl ? "jobUrl-error" : undefined
          }
          {...register("jobUrl")}
        />

        {errors.jobUrl && (
          <p
            id="jobUrl-error"
            className="field-error"
            role="alert"
          >
            {errors.jobUrl.message}
          </p>
        )}
      </div>

      {/* Salary */}
      <div className="form-group">
        <label htmlFor="salary">
          Salary
        </label>

        <input
          id="salary"
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 40000"
          disabled={loading}
          aria-invalid={errors.salary ? "true" : "false"}
          aria-describedby={
            errors.salary ? "salary-error" : undefined
          }
          {...register("salary")}
        />

        {errors.salary && (
          <p
            id="salary-error"
            className="field-error"
            role="alert"
          >
            {errors.salary.message}
          </p>
        )}
      </div>

      {/* Date Applied */}
      <div className="form-group">
        <label htmlFor="dateApplied">
          Date Applied *
        </label>

        <input
          id="dateApplied"
          type="date"
          disabled={loading}
          aria-invalid={
            errors.dateApplied ? "true" : "false"
          }
          aria-describedby={
            errors.dateApplied
              ? "dateApplied-error"
              : undefined
          }
          {...register("dateApplied")}
        />

        {errors.dateApplied && (
          <p
            id="dateApplied-error"
            className="field-error"
            role="alert"
          >
            {errors.dateApplied.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="form-group">
        <label htmlFor="status">
          Status *
        </label>

        <select
          id="status"
          disabled={loading}
          aria-invalid={errors.status ? "true" : "false"}
          aria-describedby={
            errors.status ? "status-error" : undefined
          }
          {...register("status")}
        >
          {APPLICATION_STATUSES.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>

        {errors.status && (
          <p
            id="status-error"
            className="field-error"
            role="alert"
          >
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Recruiter Name */}
      <div className="form-group">
        <label htmlFor="recruiterName">
          Recruiter Name
        </label>

        <input
          id="recruiterName"
          type="text"
          placeholder="Recruiter name"
          disabled={loading}
          aria-invalid={
            errors.recruiterName ? "true" : "false"
          }
          aria-describedby={
            errors.recruiterName
              ? "recruiterName-error"
              : undefined
          }
          {...register("recruiterName")}
        />

        {errors.recruiterName && (
          <p
            id="recruiterName-error"
            className="field-error"
            role="alert"
          >
            {errors.recruiterName.message}
          </p>
        )}
      </div>

      {/* Recruiter Email */}
      <div className="form-group">
        <label htmlFor="recruiterEmail">
          Recruiter Email
        </label>

        <input
          id="recruiterEmail"
          type="email"
          placeholder="recruiter@example.com"
          disabled={loading}
          aria-invalid={
            errors.recruiterEmail ? "true" : "false"
          }
          aria-describedby={
            errors.recruiterEmail
              ? "recruiterEmail-error"
              : undefined
          }
          {...register("recruiterEmail")}
        />

        {errors.recruiterEmail && (
          <p
            id="recruiterEmail-error"
            className="field-error"
            role="alert"
          >
            {errors.recruiterEmail.message}
          </p>
        )}
      </div>

      {/* Interview Date */}
      <div className="form-group">
        <label htmlFor="interviewDate">
          Interview Date
        </label>

        <input
          id="interviewDate"
          type="datetime-local"
          disabled={loading}
          aria-invalid={
            errors.interviewDate ? "true" : "false"
          }
          aria-describedby={
            errors.interviewDate
              ? "interviewDate-error"
              : undefined
          }
          {...register("interviewDate")}
        />

        {errors.interviewDate && (
          <p
            id="interviewDate-error"
            className="field-error"
            role="alert"
          >
            {errors.interviewDate.message}
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="form-group">
        <label htmlFor="notes">
          Notes
        </label>

        <textarea
          id="notes"
          rows={5}
          placeholder="Add notes about this application..."
          disabled={loading}
          aria-invalid={errors.notes ? "true" : "false"}
          aria-describedby={
            errors.notes ? "notes-error" : undefined
          }
          {...register("notes")}
        />

        {errors.notes && (
          <p
            id="notes-error"
            className="field-error"
            role="alert"
          >
            {errors.notes.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="form-submit">
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;