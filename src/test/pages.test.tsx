import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import AddApplication from "../pages/AddApplication";
import EditApplication from "../pages/EditApplication";

import applicationsReducer from "../store/applicationsSlice";

import * as authService from "../services/authService";
import * as applicationService from "../services/applicationService";

import type { Application } from "../types/Application";

import "@testing-library/jest-dom/vitest";


// =========================================================
// MOCK SERVICES
// =========================================================

vi.mock("../services/authService", () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
  logoutUser: vi.fn(),
}));

vi.mock("../services/applicationService", () => ({
  getApplications: vi.fn(),
  getApplicationById: vi.fn(),
  createApplication: vi.fn(),
  updateApplication: vi.fn(),
  deleteApplication: vi.fn(),
}));


// =========================================================
// TEST DATA
// =========================================================

const applications: Application[] = [
  {
    id: "1",
    company: "Google",
    jobTitle: "Frontend Developer",
    location: "London, UK",
    jobUrl: "https://google.com/jobs",
    salary: 60000,
    dateApplied: "2026-09-02",
    status: "Interview",
    recruiterName: "John Smith",
    recruiterEmail: "john@google.com",
    interviewDate: "2026-09-20",
    notes: "Technical interview scheduled.",
  },
  {
    id: "2",
    company: "Amazon",
    jobTitle: "Software Engineer",
    location: "London, UK",
    jobUrl: "https://amazon.jobs",
    salary: 65000,
    dateApplied: "2026-08-30",
    status: "Applied",
    recruiterName: "Sarah Brown",
    recruiterEmail: "sarah@amazon.com",
    notes: "Application submitted.",
  },
  {
    id: "3",
    company: "Microsoft",
    jobTitle: "React Developer",
    location: "Reading, UK",
    jobUrl: "https://careers.microsoft.com",
    salary: 62000,
    dateApplied: "2026-08-28",
    status: "Rejected",
    recruiterName: "David Wilson",
    recruiterEmail: "david@microsoft.com",
    notes: "Application rejected.",
  },
  {
    id: "4",
    company: "Deloitte",
    jobTitle: "Data Analyst",
    location: "Manchester, UK",
    jobUrl: "https://deloitte.com/careers",
    salary: 50000,
    dateApplied: "2026-08-25",
    status: "Offer",
    recruiterName: "Emma Taylor",
    recruiterEmail: "emma@deloitte.com",
    notes: "Offer received.",
  },
];


// =========================================================
// REDUX TEST STORE
// =========================================================

const createTestStore = () =>
  configureStore({
    reducer: {
      applications: applicationsReducer,
    },
  });


// =========================================================
// RENDER HELPERS
// =========================================================

const renderWithRouter = (
  ui: React.ReactElement
) => {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
};


const renderWithProviders = (
  ui: React.ReactElement
) => {
  const store = createTestStore();

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </Provider>
    ),
  };
};


// =========================================================
// EDIT APPLICATION RENDER HELPER
// =========================================================

const renderEditApplication = () => {
  const store = createTestStore();

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/applications/edit/1"]}>
          <Routes>
            <Route
              path="/applications/edit/:id"
              element={<EditApplication />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
};


// =========================================================
// RESET BEFORE EACH TEST
// =========================================================

beforeEach(() => {
  vi.clearAllMocks();

  localStorage.clear();

  vi.mocked(authService.loginUser).mockResolvedValue({
    id: "user-1",
    email: "test@example.com",
    password: "password123",
  });

  vi.mocked(authService.registerUser).mockResolvedValue({
    id: "user-2",
    email: "new@example.com",
    password: "password123",
  });

  vi.mocked(applicationService.getApplications).mockResolvedValue(
    applications
  );

  vi.mocked(applicationService.getApplicationById).mockResolvedValue(
    applications[0]
  );

  vi.mocked(applicationService.createApplication).mockResolvedValue(
    applications[0]
  );

  vi.mocked(applicationService.updateApplication).mockResolvedValue(
    applications[0]
  );

  vi.mocked(applicationService.deleteApplication).mockResolvedValue(
    undefined
  );
});


// =========================================================
// LOGIN PAGE
// =========================================================

describe("Login page", () => {
  it("renders the login page", () => {
  renderWithRouter(<Login />);

  expect(
    screen.getByRole("heading", {
      name: "JobTrack",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText("Job Application Management")
  ).toBeInTheDocument();
});
  });

  it("renders email and password fields", () => {
    renderWithRouter(<Login />);

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/^password$/i)
    ).toBeInTheDocument();
  });

  it("allows the user to enter login details", () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByLabelText(/email/i);

    const passwordInput = screen.getByLabelText(
      /^password$/i
    );

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    expect(emailInput).toHaveValue(
      "test@example.com"
    );

    expect(passwordInput).toHaveValue(
      "password123"
    );
  });

  it("shows validation errors when login fields are empty", async () => {
  renderWithRouter(<Login />);

  const submitButton = screen.getByRole("button", {
    name: /login/i,
  });

  fireEvent.click(submitButton);

  expect(
    await screen.findByText(
      "Please enter your email and password."
    )
  ).toBeInTheDocument();
});


// =========================================================
// REGISTER PAGE
// =========================================================

describe("Register page", () => {
  it("renders the register page", () => {
    renderWithRouter(<Register />);

    expect(
      screen.getByText("Create your account")
    ).toBeInTheDocument();
  });

  it("renders registration fields", () => {
    renderWithRouter(<Register />);

    expect(
      screen.getByLabelText("Email")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Password", {
        exact: true,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Confirm Password")
    ).toBeInTheDocument();
  });

  it("allows the user to enter registration details", () => {
    renderWithRouter(<Register />);

    const emailInput = screen.getByLabelText("Email");

    const passwordInput = screen.getByLabelText(
      "Password",
      {
        exact: true,
      }
    );

    const confirmPasswordInput =
      screen.getByLabelText("Confirm Password");

    fireEvent.change(emailInput, {
      target: {
        value: "new@example.com",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    fireEvent.change(confirmPasswordInput, {
      target: {
        value: "password123",
      },
    });

    expect(emailInput).toHaveValue(
      "new@example.com"
    );

    expect(passwordInput).toHaveValue(
      "password123"
    );

    expect(confirmPasswordInput).toHaveValue(
      "password123"
    );
  });
});


// =========================================================
// DASHBOARD
// =========================================================

describe("Dashboard page", () => {
  it("renders the Dashboard page", async () => {
    renderWithProviders(<Dashboard />);

    expect(
      await screen.findByRole("heading", {
        name: /dashboard/i,
      })
    ).toBeInTheDocument();
  });

  it("displays application statistics", async () => {
  renderWithProviders(<Dashboard />);

  expect(
    await screen.findByText("Total Applications")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Interviews")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Offers")
  ).toBeInTheDocument();

  expect(
    screen.getAllByText("Rejected").length
  ).toBeGreaterThan(0);

  expect(
    screen.getByText("Applications This Month")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Offer Conversion")
  ).toBeInTheDocument();
});
});


// =========================================================
// APPLICATIONS PAGE
// =========================================================

describe("Applications page", () => {
  it("displays the Applications heading", async () => {
    renderWithProviders(<Applications />);

    expect(
      await screen.findByRole("heading", {
        name: "Applications",
      })
    ).toBeInTheDocument();
  });

  it("displays applications from the API", async () => {
    renderWithProviders(<Applications />);

    const googleRow = await screen.findByRole(
      "row",
      {
        name: /Google Frontend Developer London, UK/i,
      }
    );

    expect(googleRow).toBeInTheDocument();

    expect(
      screen.getByRole("row", {
        name: /Amazon Software Engineer London, UK/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("row", {
        name: /Microsoft React Developer Reading, UK/i,
      })
    ).toBeInTheDocument();
  });

  it("filters applications by search text", async () => {
    renderWithProviders(<Applications />);

    expect(
      await screen.findByRole("row", {
        name: /Google Frontend Developer London, UK/i,
      })
    ).toBeInTheDocument();

    const searchInput =
      screen.getByPlaceholderText(
        "Search company, job title..."
      );

    fireEvent.change(searchInput, {
      target: {
        value: "Amazon",
      },
    });

    expect(
      screen.getByRole("row", {
        name: /Amazon Software Engineer London, UK/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("row", {
        name: /Google Frontend Developer London, UK/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("row", {
        name: /Microsoft React Developer Reading, UK/i,
      })
    ).not.toBeInTheDocument();
  });

  it("filters applications by status", async () => {
    renderWithProviders(<Applications />);

    expect(
      await screen.findByRole("row", {
        name: /Google Frontend Developer London, UK/i,
      })
    ).toBeInTheDocument();

    const statusFilter =
      screen.getByLabelText("Status");

    fireEvent.change(statusFilter, {
      target: {
        value: "Rejected",
      },
    });

    expect(
      screen.getByRole("row", {
        name: /Microsoft React Developer Reading, UK/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("row", {
        name: /Google Frontend Developer London, UK/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("row", {
        name: /Amazon Software Engineer London, UK/i,
      })
    ).not.toBeInTheDocument();
  });
});


// =========================================================
// ADD APPLICATION
// =========================================================

describe("Add Application page", () => {
  it("renders the Add Application form", () => {
    renderWithProviders(<AddApplication />);

    expect(
      screen.getByRole("heading", {
        name: /add application/i,
      })
    ).toBeInTheDocument();
  });

  it("renders the required application fields", () => {
    renderWithProviders(<AddApplication />);

    expect(
      screen.getByLabelText(/company/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/job title/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/location/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/date applied/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/status/i)
    ).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    renderWithProviders(<AddApplication />);

    const submitButton = screen.getByRole(
      "button",
      {
        name: /add application/i,
      }
    );

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(
        "Company name is required."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Job title is required."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Location is required."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Application date is required."
      )
    ).toBeInTheDocument();
  });
});


// =========================================================
// EDIT APPLICATION
// =========================================================

describe("Edit Application page", () => {
  it("loads an existing application", async () => {
    renderEditApplication();

    expect(
      await screen.findByDisplayValue("Google")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(
        "Frontend Developer"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("London, UK")
    ).toBeInTheDocument();
  });

  it("renders the edit application heading", async () => {
    renderEditApplication();

    expect(
      await screen.findByRole("heading", {
        name: /edit application/i,
      })
    ).toBeInTheDocument();
  });
});