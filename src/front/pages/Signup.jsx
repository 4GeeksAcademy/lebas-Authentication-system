import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Signup = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

        const apiUrl = import.meta.env.VITE_BACKEND_URL;

        const res = await fetch(`${apiUrl}/api/register`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

            if (res.ok) {
            navigate("/login");
            }
            else {
                throw new Error("Registration error");
            }

        } catch (err) {
        console.error(err.message);
        }
        };
            return (
            <div className="container">
                <div className="row">
                    <section className="vh-100" style={{backgroundColor: "#eee"}}>
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-12 col-xl-11">
                                <div className="card text-black" style={{borderRadius: "25px"}}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                            <input type="text" 
                                                name="lastname" 
                                                className="form-control" 
                                                value={formData.lastname}
                                                onChange={handleChange} 
                                                />
                                            <label className="form-label">Your Name</label>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                            <input type="email" 
                                                name="email" 
                                                className="form-control" 
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            <label className="form-label">Your Email</label>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                            <input type="password" 
                                                name="password"
                                                className="form-control" 
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            <label className="form-label" >Password</label>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button  type="button submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                                        </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        className="img-fluid" alt="Sample image" />

                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            )
}