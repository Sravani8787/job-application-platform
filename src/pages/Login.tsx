import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await loginUser(email, password);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background decorative elements */}
      <div className="login-background-shape shape-one"></div>
      <div className="login-background-shape shape-two"></div>

      <div className="login-card">
        <div className="login-content">

          {/* Logo */}
          <div className="login-logo">
            <div className="logo-icon">J</div>
            <span>JobTrack</span>
          </div>

          {/* Heading */}
          <h1>Login</h1>

          <p className="login-subtitle">
            Sign in to manage your job applications
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Error */}
            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            {/* Email */}
            <div className="login-form-group">
              <label htmlFor="email">
                Email
              </label>

              <div className="login-input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-wrapper">
                <span className="input-icon">🔒</span>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="login-options">

              <label className="remember-me">
                <input
                  type="checkbox"
                  name="remember"
                />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login button */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Register */}
          <p className="register-link-text">
            Don't have an account?

            <button
              type="button"
              className="register-link"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;