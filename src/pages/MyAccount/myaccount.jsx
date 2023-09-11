import { useNavigate } from "react-router-dom";

const MyAccount = ({ onLogout, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(null);
    navigate("/login");
  };

  return (
    <section className="container mt-5">
      <h1 className="text-center font-weight-bold text-primary display-4">
        Protected route {user?.email}
      </h1>
      <div className="text-center">
        <button onClick={handleLogout} className="btn btn-primary mt-3">
          Logout
        </button>
      </div>
    </section>
  );
};

export default MyAccount;
