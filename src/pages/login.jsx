import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  {loginUser}  from '../services/authService';
import { FaUser, FaLock } from "react-icons/fa";
import fondoBD18 from "../assets/fondo_bd18.png"; // Ajusta la ruta según tu estructura
import logo from "../assets/logo.jpeg";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await loginUser({ email, password }); // Asegúrate que esta función retorne el `data.token`
    //localStorage
    if (data && data.token) {
      localStorage.setItem('token', data.token);  // Guardar el token
      navigate('/dashboard');                     // Redirigir al dashboard
    } else {
      alert("Credenciales incorrectas");
    }
  } catch (err) {
    alert("Error en el login");
  }
};

 return (
    <div
      className=" h-screen bg-no-repeat flex items-center justify-center w-screen bg-cover"
      style={{
        backgroundImage: `url(${fondoBD18})`, // reemplaza con la URL o ruta de tu imagen
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-pink-600/30 bg-opacity-90 p-6 rounded-xl shadow-lg w-80 text-white"
      >
        <div
        className="h-22 w-68 bg-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url(${logo})`,
        }}
        ></div>


        <div className="flex items-center bg-linear-to-r from-[#ec008c] to-[#2f3842] text-white rounded mb-4 px-3 py-2 mt-2">
          <FaUser className="mr-2" />
          <input
            className="w-full bg-transparent  outline-none"
            type="text"
            placeholder="Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center bg-linear-to-r from-[#ec008c] to-[#2f3842] text-white rounded mb-4 px-3 py-2">
          <FaLock className="mr-2" />
          <input
            className="w-full bg-transparent outline-none"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="block w-52 mx-auto bg-[#7d3861] text-white font-semibold py-2 rounded hover:bg-gray-100 hover:text-[#7d3861] transition"
        >
          INGRESAR
        </button>
      </form>
    </div>
  );
}

export default Login;