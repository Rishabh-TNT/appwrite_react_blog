import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ authentication, children }) {
  console.log("Authentication: ", authentication);
  const status = useSelector((state) => state.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication && status !== authentication) {
      navigate("/login");
    } else if (!authentication && status !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authentication, navigate, status]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
