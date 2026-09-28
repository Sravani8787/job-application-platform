import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(trimmedEmail, password);

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* Decorative background elements */}
      <div className="register-background-shape register-shape-one"></div>
      <div className="register-background-shape register-shape-two"></div>

      {/* Register Card */}
      <div className="register-card">

        <div className="register-content">

          {/* Logo */}
          <div className="register-logo">
            <div className="register-logo-icon">
              J
            </div>

            <span>JobTrack</span>
          </div>

          {/* Heading */}
          <h1>Register</h1>

          <p className="register-subtitle">
            Create your account to manage your job applications
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="register-form-group">
              <label htmlFor="email">
                Email
              </label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="register-form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="register-form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  🔒
                </span>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                className="register-error"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <p
                className="register-success"
                role="status"
              >
                {success}
              </p>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Register"}
            </button>
          </form>

          {/* Login Link */}
          <p className="login-link-text">
            Already have an account?

            <button
              type="button"
              className="login-link"
              onClick={() => navigate("/login")}
              disabled={loading}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;