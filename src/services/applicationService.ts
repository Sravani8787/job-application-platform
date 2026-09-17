import axios from "axios";
import type { Application } from "../types/Application";

const APPLICATIONS_API_URL =
  "http://localhost:3001/applications";

const USERS_API_URL =
  "http://localhost:3001/users";

// ===============================
// APPLICATIONS
// ===============================

export const getApplications = async (): Promise<Application[]> => {
  const response = await axios.get<Application[]>(
    APPLICATIONS_API_URL
  );

  return response.data;
};

export const getApplicationById = async (
  id: string
): Promise<Application> => {
  const response = await axios.get<Application>(
    `${APPLICATIONS_API_URL}/${id}`
  );

  return response.data;
};

export const createApplication = async (
  application: Omit<Application, "id">
): Promise<Application> => {
  const response = await axios.post<Application>(
    APPLICATIONS_API_URL,
    application
  );

  return response.data;
};

export const updateApplication = async (
  id: string,
  application: Omit<Application, "id">
): Promise<Application> => {
  const response = await axios.put<Application>(
    `${APPLICATIONS_API_URL}/${id}`,
    application
  );

  return response.data;
};

export const deleteApplication = async (
  id: number
): Promise<void> => {
  await axios.delete(`${APPLICATIONS_API_URL}/${id}`);
};

// ===============================
// LOGIN
// ===============================

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await axios.get(
    USERS_API_URL
  );

  const user = response.data.find(
    (item: { email: string; password: string }) =>
      item.email.trim().toLowerCase() ===
        email.trim().toLowerCase() &&
      item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
};