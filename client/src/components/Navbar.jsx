import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Welcome User!
            </li>
            <li>
              <Link to="/tasks"
                className="bg-purple-600 px-4 py-1 rounded-sm"
              >Tareas</Link>
            </li>
            <li>
              <Link to="/add-task"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >Crear Tarea</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >Login</Link>
            </li>
            <li>
              <Link to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
