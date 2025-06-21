import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const Private = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);  
        } else {
          navigate("/login");
        }
      } catch (err) {
      } finally {
        setLoading(false);  
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>Error : Impossible to retreive user data.</p>;
  }

  return (
    <div>
      <h1 className="mt-5 mb-5 text-center">Your profile</h1>
      <div className="w-50 justify-content-center">
        <div className="float-start ms-5"><img src={userData?.avatar} alt="" /></div>
        <div className="float-end me-5 mt-3">
          <p>Your name: {userData?.lastname}</p>
          <p>Your email: {userData?.email}</p>
        </div>
      </div>
    </div>
  );
};