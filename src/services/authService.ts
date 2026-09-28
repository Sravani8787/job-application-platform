import api from "./api";

export interface User {
  id: string;
  email: string;
  password: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await api.get<User[]>("/users");

  const user = response.data.find(
    (item) =>
      item.email.trim().toLowerCase() ===
        email.trim().toLowerCase() &&
      item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("userEmail", user.email);
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  return user;
};

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await api.get<User[]>("/users");

  const emailExists = response.data.some(
    (user) =>
      user.email.trim().toLowerCase() ===
      email.trim().toLowerCase()
  );

  if (emailExists) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  const createResponse = await api.post<User>(
    "/users",
    {
      email: email.trim(),
      password,
    }
  );

  return createResponse.data;
};

export const logoutUser = (): void => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("user");
};