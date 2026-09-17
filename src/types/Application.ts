export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface Application {
  id: number;
  company: string;
  position: string;
  location: string;
  dateApplied: string;
  status: ApplicationStatus;
}