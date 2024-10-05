import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../contexts/loginContext";

export const Login = () => {
  const navigate = useNavigate();

  const {user} = useAuth()

  if(user) {
    navigate('/dashboard')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="position-relative" style={{ width: "400px" }}>
        <div className="d-flex justify-content-start">
          <BiArrowBack
            onClick={() => navigate("/")}
            size={32}
            style={{
              cursor: "pointer",
            }}
          />
        </div>

        <div className="card p-4 mt-2">
          <h2 className="text-center mb-4">Login</h2>
          <LoginForm/>
        </div>
      </div>
    </div>
  );
};
