import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import Mycontext from "../context/Mycontext";

const Auth = ({ setUser }) => {  // <-- Accept setUser as a prop
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mode } = useContext(Mycontext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let userCredential;

      if (isSignUp) {
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }

        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: formData.name });

        const updatedUser = { name: formData.name, email: user.email };
        
        // Update state immediately
        setUser(updatedUser);

        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        navigate("/dashboard");
      } else {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        const name = user.displayName || "User";
        const loggedInUser = { name, email: user.email };
        
        // Update state immediately
        setUser(loggedInUser);

        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        navigate("/dashboard");
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const googleUser = { name: user.displayName, email: user.email };
      
      // Update state immediately
      setUser(googleUser);

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(googleUser));

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
      mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      <div className={`shadow-lg p-8 rounded-xl w-full max-w-md ${
        mode === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className="text-3xl font-bold text-center">
          {isSignUp ? "Create an Account" : "Welcome Back!"}
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
                mode === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
              mode === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
              mode === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold transition hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Google Sign-In */}
        <button
          onClick={googleSignIn}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg font-semibold transition hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Sign In with Google"}
        </button>

        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-400 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};


Auth.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Auth;
