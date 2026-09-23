import api from "./api";

import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
} from "../types/Application";

export const getApplications = async (): Promise<
  Application[]
> => {
  const response =
    await api.get<Application[]>("/applications");

  return response.data;
};

export const getApplicationById = async (
  id: string
): Promise<Application> => {
  const response =
    await api.get<Application>(
      `/applications/${id}`
    );

  return response.data;
};

export const createApplication = async (
  application: CreateApplicationInput
): Promise<Application> => {
  const response =
    await api.post<Application>(
      "/applications",
      application
    );

  return response.data;
};

export const updateApplication = async (
  id: string,
  application: UpdateApplicationInput
): Promise<Application> => {
  const response =
    await api.put<Application>(
      `/applications/${id}`,
      application
    );

  return response.data;
};

export const deleteApplication = async (
  id: string
): Promise<void> => {
  await api.delete(`/applications/${id}`);
};