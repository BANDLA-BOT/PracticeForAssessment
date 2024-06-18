import { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassowrd] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showPassword = () => {
    setTogglePassowrd("text");
  };
  const hidePassword = () => {
    setTogglePassowrd("password");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!password && !email) {
      toast.error("Enter email and password");
    } else {
      const credentials = new FormData();
      credentials.append("email", email);
      credentials.append("password", password);
      axios
        .post("http://localhost:8000/login", credentials)
        .then((res) => {
          console.log(res.data.success);
          localStorage.setItem("token", res.data.token);
          if (res.data.success) {
            toast.success(res.data.success);
            setTimeout(() => {
              navigate("/profile");
            }, 1500);
          }
        })
        .catch((res) => {
          console.log(res.data.message);
        });
    }
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          alert("Session expired. Redirecting to login page.");
          localStorage.removeItem("token");
          navigate.push("/");
        } else {
          setTimeout(() => {
            alert("Session expired. Redirecting to login page.");
            localStorage.removeItem("token");
            navigate.push("/");
          }, expirationTime - currentTime);
        }
      }
    };
    checkTokenExpiry();
  }, [navigate]);

  return (
    <div>
      <ToastContainer />
      <div className="form">
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <input
              type={togglePassword}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {togglePassword === "password" ? (
              <FaRegEye onClick={showPassword} />
            ) : (
              <FaRegEyeSlash onClick={hidePassword} />
            )}
          </div>
          <input type="submit" value="Login" />
        </form>
        <p>Dont have an account yet ? <span><Link to={'/register'}>Register</Link></span></p>
      </div>
    </div>
  );
};

export default Login;
