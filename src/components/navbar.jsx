import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link className={location.pathname === "/" ? "active" : ""} to="/">
        🏠 Home
      </Link>
      <Link className={location.pathname === "/claims" ? "active" : ""} to="/claims">
        📜 Claims
      </Link>
    </nav>
  );
}