import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Navbar = () => {

	const navigate = useNavigate();
	const { store, dispatch, actions } = useGlobalReducer()

	const logout = () => {
		localStorage.removeItem("token");
		store.isAuthenticated = false;
		navigate("/login");
		}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" style={{textDecoration: "none"}}>
					<span className="navbar-brand mb-0 h1">Authentication system</span>
				</Link>
				<div className="ml-auto">
					{store.isAuthenticated && (
					<button className="btn btn-primary" onClick={logout}>Logout</button>
					)}					
				</div>
			</div>
		</nav>
	);
};