import "@testing-library/jest-dom/vitest";

import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";

import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import AddApplication from "../pages/AddApplication";
import EditApplication from "../pages/EditApplication";

/* --------------------------------------------------
   MOCK FUNCTIONS
-------------------------------------------------- */

const mockNavigate = vi.fn();

const mockLoginUser = vi.fn();
const mockRegisterUser = vi.fn();

const mockGetApplications = vi.fn();
const mockCreateApplication = vi.fn();
const mockUpdateApplication = vi.fn();
const mockDeleteApplication = vi.fn();

/* --------------------------------------------------
   ROUTER MOCK
-------------------------------------------------- */

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
}));

/* --------------------------------------------------
   AUTH SERVICE MOCK
-------------------------------------------------- */

vi.mock("../services/authService", () => ({
  loginUser: (...args: unknown[]) => mockLoginUser(...args),
  registerUser: (...args: unknown[]) => mockRegisterUser(...args),
}));

/* --------------------------------------------------
   APPLICATION SERVICE MOCK
-------------------------------------------------- */

vi.mock("../services/applicationService", () => ({
  getApplications: (...args: unknown[]) =>
    mockGetApplications(...args),

  createApplication: (...args: unknown[]) =>
    mockCreateApplication(...args),

  updateApplication: (...args: unknown[]) =>
    mockUpdateApplication(...args),

  deleteApplication: (...args: unknown[]) =>
    mockDeleteApplication(...args),
}));

/* --------------------------------------------------
   TEST DATA
-------------------------------------------------- */

const mockApplications = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Developer",
    location: "London, UK",
    dateApplied: "2026-09-02",
    status: "Interview",
  },
  {
    id: 2,
    company: "Amazon",
    position: "Software Engineer",
    location: "London, UK",
    dateApplied: "2026-08-30",
    status: "Applied",
  },
  {
    id: 3,
    company: "Microsoft",
    position: "React Developer",
    location: "Reading, UK",
    dateApplied: "2026-08-28",
    status: "Rejected",
  },
  {
    id: 4,
    company: "Deloitte",
    position: "Data Analyst",
    location: "Manchester, UK",
    dateApplied: "2026-08-25",
    status: "Offer",
  },
];

const mockApplication = {
  id: 1,
  company: "Google",
  position: "Frontend Developer",
  location: "London, UK",
  dateApplied: "2026-09-02",
  status: "Interview",
};

/* --------------------------------------------------
   BEFORE / AFTER EACH TEST
-------------------------------------------------- */

beforeEach(() => {
  vi.clearAllMocks();

  /*
   * Always return applications by default.
   * This prevents Dashboard and EditApplication
   * from receiving undefined.
   */
  mockGetApplications.mockResolvedValue(mockApplications);

  mockCreateApplication.mockResolvedValue({
    id: 4,
    company: "Apple",
    position: "Frontend Developer",
    location: "London, UK",
    dateApplied: "2026-09-07",
    status: "Applied",
  });

  mockUpdateApplication.mockResolvedValue(mockApplication);

  mockDeleteApplication.mockResolvedValue(undefined);
});

afterEach(() => {
  cleanup();
});

/* ==================================================
   LOGIN PAGE
================================================== */

describe("Login page", () => {
  it("renders the login page", () => {
    render(<Login />);

    expect(document.body.textContent).not.toBe("");
  });

  it("renders an email input", () => {
    render(<Login />);

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();
  });

  it("renders a password input", () => {
    render(<Login />);

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();
  });

  it("renders the login button", () => {
    render(<Login />);

    expect(
      screen.getByRole("button", {
        name: /login/i,
      })
    ).toBeInTheDocument();
  });
});

/* ==================================================
   REGISTER PAGE
================================================== */

describe("Register page", () => {
  it("renders the registration page", () => {
    render(<Register />);

    expect(document.body).toBeInTheDocument();
  });

  it("renders registration content", () => {
    render(<Register />);

    expect(document.body.textContent).not.toBe("");
  });

  it("renders the registration form inputs", () => {
    const { container } = render(<Register />);

    const inputs = container.querySelectorAll("input");

    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });
});

/* ==================================================
   DASHBOARD PAGE
================================================== */

describe("Dashboard page", () => {
  it("renders the Dashboard page", async () => {
    mockGetApplications.mockResolvedValueOnce([
      {
        id: 1,
        company: "Google",
        position: "Frontend Developer",
        location: "London, UK",
        dateApplied: "2026-09-02",
        status: "Interview",
      },
      {
        id: 2,
        company: "Amazon",
        position: "Software Engineer",
        location: "London, UK",
        dateApplied: "2026-08-30",
        status: "Applied",
      },
      {
        id: 3,
        company: "Microsoft",
        position: "React Developer",
        location: "Reading, UK",
        dateApplied: "2026-08-28",
        status: "Rejected",
      },
      {
        id: 4,
        company: "Deloitte",
        position: "Data Analyst",
        location: "Manchester, UK",
        dateApplied: "2026-08-25",
        status: "Offer",
      },
    ]);

    render(<Dashboard />);

    await waitFor(() => {
      expect(
        screen.getByText("Dashboard")
      ).toBeInTheDocument();
    });
  });

  it("renders the dashboard content", async () => {
    mockGetApplications.mockResolvedValueOnce([
      {
        id: 1,
        company: "Google",
        position: "Frontend Developer",
        location: "London, UK",
        dateApplied: "2026-09-02",
        status: "Interview",
      },
      {
        id: 2,
        company: "Amazon",
        position: "Software Engineer",
        location: "London, UK",
        dateApplied: "2026-08-30",
        status: "Applied",
      },
      {
        id: 3,
        company: "Microsoft",
        position: "React Developer",
        location: "Reading, UK",
        dateApplied: "2026-08-28",
        status: "Rejected",
      },
      {
        id: 4,
        company: "Deloitte",
        position: "Data Analyst",
        location: "Manchester, UK",
        dateApplied: "2026-08-25",
        status: "Offer",
      },
    ]);

    render(<Dashboard />);

    expect(
      await screen.findByText("Job Application Overview")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Total Applications")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Applied")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Interviews")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Offers")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Rejected")
    ).toBeInTheDocument();
  });
});

/* ==================================================
   APPLICATIONS PAGE
================================================== */

describe("Applications page", () => {
  it("displays the Applications heading", async () => {
    render(<Applications />);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Applications",
        })
      ).toBeInTheDocument();
    });
  });

  it("displays applications from the API", async () => {
    render(<Applications />);

    await waitFor(() => {
      expect(
        screen.getByText("Google")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Amazon")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Microsoft")
      ).toBeInTheDocument();
    });
  });

  it("filters applications by search text", async () => {
    render(<Applications />);

    await waitFor(() => {
      expect(
        screen.getByText("Google")
      ).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(
      "Search company, position, location or status..."
    );

    fireEvent.change(searchInput, {
      target: {
        value: "Amazon",
      },
    });

    expect(
      screen.getByText("Amazon")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Google")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Microsoft")
    ).not.toBeInTheDocument();
  });

  it("filters applications by status", async () => {
    render(<Applications />);

    await waitFor(() => {
      expect(
        screen.getByText("Google")
      ).toBeInTheDocument();
    });

    const statusFilter =
      screen.getByDisplayValue("All Statuses");

    fireEvent.change(statusFilter, {
      target: {
        value: "Rejected",
      },
    });

    expect(
      screen.getByText("Microsoft")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Google")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Amazon")
    ).not.toBeInTheDocument();
  });
});

/* ==================================================
   ADD APPLICATION PAGE
================================================== */

describe("Add Application page", () => {
  it("renders the Add Application form", () => {
    render(<AddApplication />);

    expect(
      screen.getByRole("heading", {
        name: /add application/i,
      })
    ).toBeInTheDocument();
  });

  it("shows validation when required fields are empty", async () => {
    render(<AddApplication />);

    const submitButton = screen.getByRole("button", {
      name: /add application/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/required/i)
      ).toBeInTheDocument();
    });
  });

  it("submits a valid application", async () => {
    render(<AddApplication />);

    fireEvent.change(
      screen.getByLabelText(/company/i),
      {
        target: {
          value: "Apple",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/position/i),
      {
        target: {
          value: "Frontend Developer",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/location/i),
      {
        target: {
          value: "London, UK",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/date applied/i),
      {
        target: {
          value: "2026-09-07",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/status/i),
      {
        target: {
          value: "Applied",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /add application/i,
      })
    );

    await waitFor(() => {
      expect(
        mockCreateApplication
      ).toHaveBeenCalled();

      expect(
        mockNavigate
      ).toHaveBeenCalledWith("/applications");
    });
  });
});

/* ==================================================
   EDIT APPLICATION PAGE
================================================== */

describe("Edit Application page", () => {
  it("renders the Edit Application page", async () => {
    render(<EditApplication />);

    await waitFor(() => {
      expect(
        document.querySelector(".add-application-page")
      ).toBeInTheDocument();
    });
  });

  it("renders the application form", async () => {
    render(<EditApplication />);

    await waitFor(() => {
      expect(
        screen.getByDisplayValue("Google")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByDisplayValue("Frontend Developer")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("London, UK")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /update application/i,
      })
    ).toBeInTheDocument();
  });
});