export const APPLICATION_STATUSES = [
  "Saved",
  "Applied",
  "Screening",
  "Interview",
  "Technical Interview",
  "Final Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
] as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[number];

export interface Application {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  jobUrl?: string;
  salary?: number;
  dateApplied: string;
  status: ApplicationStatus;
  recruiterName?: string;
  recruiterEmail?: string;
  interviewDate?: string;
  notes?: string;
}

export type CreateApplicationInput = Omit<
  Application,
  "id"
>;

export type UpdateApplicationInput =
  CreateApplicationInput;