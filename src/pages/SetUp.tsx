import { useState } from "react";
import { EyeClosed, Eye } from "lucide-react";
import { useToast } from "../components/Toast";
import { useNavigate } from "react-router-dom";

type Errors = {
  length: boolean;
  match: boolean;
};

function SetUp() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    length: false,
    match: false,
  });
  const [savedPassword, _setSavedPassword] = useState<string | null>(() =>
    localStorage.getItem("password"),
  );

  function validate(pw: string, confirm: string): Errors {
    return {
      length: pw.length > 0 && pw.length < 8,
      match: confirm.length > 0 && pw !== confirm,
    };
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);
    setErrors(validate(value, confirmPassword));
  }

  function handleConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors(validate(password, value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const finalErrors = validate(password, confirmPassword);
    setErrors(finalErrors);

    if (!finalErrors.length && !finalErrors.match) {
      showToast("Password Set Successfully!", "success");
      localStorage.setItem("password", password);
      navigate("/dashboard");
    } else {
      showToast("Please fill in missing fields!", "error");
    }
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const checkPassword = password === savedPassword;

    if (checkPassword) {
      showToast("Login Successfully!", "success");
      navigate("/dashboard");
    } else {
      showToast("Wrong password entered!", "error");
    }
  }

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="min-h-full bg-black flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-blue-950/30 to-black animate-gradient" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/60 animate-float"
          style={{
            left: `${particle.left}%`,
            bottom: "-10px",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
      {!savedPassword ? (
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8 max-w-sm flex flex-col space-y-3 ">
          <h2 className="text-xl font-semibold text-white">Create Password</h2>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-blue-400">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="new-password"
                onChange={handlePasswordChange}
                className="mt-1 w-full rounded-md text-[#FFFFFF] border border-gray-300 px-3 py-2 pr-10
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-blue-200/80"
                aria-label="Toggle password visibility">
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>

            {errors.length && (
              <p className="text-sm text-red-500 mt-1">
                Password must be at least 8 characters
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-blue-400">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                autoComplete="new-password"
                onChange={handleConfirmChange}
                className="mt-1 w-full rounded-md text-[#FFFFFF] border border-gray-300 px-3 py-2 pr-10
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-blue-200/80"
                aria-label="Toggle confirm password visibility">
                {showConfirmPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>

            {errors.match && (
              <p className="text-sm text-red-500 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md
                     hover:bg-blue-700 transition">
            Submit
          </button>
        </form>
      ) : (
        <>
        <form
          onSubmit={handleLogin}
          className="relative z-10 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8 max-w-sm flex flex-col space-y-3 ">
          <h2 className="text-xl font-semibold text-white">Sign-In</h2>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-blue-400">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="new-password"
                onChange={handlePasswordChange}
                className="mt-1 w-full rounded-md border text-[#FFFFFF] border-gray-300 px-3 py-2 pr-10
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-blue-200/80"
                aria-label="Toggle password visibility">
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>

            {errors.length && (
              <p className="text-sm text-red-500 mt-1">
                Password must be at least 8 characters
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md
                     hover:bg-blue-700 transition">
            Submit
          </button>
        </form>
        <button
          onClick={() => {localStorage.removeItem("password"); navigate("/")}}
          className="relative z-10 w-full py-3.5 px-6 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]">
          Create Wallet
        </button>
        </>
      )}
    </div>
  );
}

export default SetUp;