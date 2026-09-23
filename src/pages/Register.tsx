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
      <div className="register-card">
        <h1>JobTrack</h1>

        <p className="register-subtitle">
          Create your account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="email">
              Email
            </label>

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

          <div className="register-form-group">
            <label htmlFor="password">
              Password
            </label>

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

          <div className="register-form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

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

          {error && (
            <p
              className="register-error"
              role="alert"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              className="register-success"
              role="status"
            >
              {success}
            </p>
          )}

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

        <p className="login-link-text">
          Already have an account?{" "}

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
  );
}

export default Register;