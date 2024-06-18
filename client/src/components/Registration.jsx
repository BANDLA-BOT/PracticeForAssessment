import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";

const Registration = () => {
  const navigate = useNavigate()
  const [togglePassword, setTogglePassowrd] = useState("password");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState();

  const showPassword = () => {
    setTogglePassowrd("text");
  };
  const hidePassword = () => {
    setTogglePassowrd("password");
  };

  const submitHandler = (e) => {
    e.preventDefault()
    if(!password && !confirmPassword && !username && !email && !profilePic){
        toast.error("fill the fields")
    }
    else if (confirmPassword === password) {
      const picture = new FormData();
      picture.append("profilepic", profilePic);
      picture.append("username", username);
      picture.append("email", email);
      picture.append("password", password);
      axios
        .post("http://localhost:8000/register", picture,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.user)
          if(res.data.success){
            toast.success("Registered successfully");
            setTimeout(() => {
              navigate('/')
            }, 1000);
          }
        else{
          toast.error('User exist already')
        }
        })
        .catch((res) => {
          toast.err(res.data.message);
        });
    }
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('')
    setProfilePic(null)
  };
  return (
    <div>
      <ToastContainer />
      <div className="form">
        <form onSubmit={submitHandler}>
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <div>
            <input
              type={togglePassword}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {username ? <input type="submit" value="Register" /> : <input type="submit" value="Register" />}
         <p>Already have an account ? <span><Link to={'/'}>Login</Link></span></p>

          
        </form>
      </div>
    </div>
  );
};

export default Registration;
