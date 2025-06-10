import Chart from '../components/charts';
import logo2 from "../assets/logo2.png";
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registra elementos de Chart.js y el plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const datos = [
  { titulo: "KASNET", valor: "S/ 9,030", color: "bg-pink-600" },
  { titulo: "YAPE", valor: "S/ 987", color: "bg-pink-400" },
  { titulo: "CAJA", valor: "S/ 2,335.90", color: "bg-purple-900" },
  { titulo: "DIFERENCIA", valor: "S/ 1.60", color: "bg-blue-500" },
];

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Si no hay token, redirige al login
      window.location.href = '/';
      return;
    }

    // Verificamos el token con el backend
    fetch('http://localhost:3000/api/dashboard', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => {
        if (!res.ok) {
          // Token inválido o expirado
          throw new Error('Token inválido o expirado');
        }
        return res.json();
      })
      .then(data => {
        setUser(data.user); // Puedes usar la info del usuario si quieres
      })
      .catch(() => {
        // Token inválido, redirige al login
        localStorage.removeItem('token');
        window.location.href = '/';
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-[1300px] mx-auto p-4 border-8 border-pink-700 rounded-[40px] bg-white">

        {/* Header y Filtros */}
        <div className="mb-4 p-4 bg-white rounded-lg flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">Costo y Productividad</div>
            <div
                    className="h-22 w-68 bg-center bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${logo2})`,
                    }}
                    ></div>
          </div>

          <div className="flex flex-wrap gap-4 justify-between items-start">
            <div className="flex flex-col gap-2 flex-2">
                <select className="p-2 rounded border border-black">
                {Array.from({ length: 30 }, (_, i) => (
                 <option key={i}>Día {i + 1}</option>
                   ))}
                </select>

              <select className="p-2 rounded border border-black">
                <option>Enero</option>
                <option>Febrero</option>
                <option>Marzo</option>
                <option>Abril</option>
                <option>Mayo</option>
              </select>
              <select className="p-2 rounded border border-black">
                <option>Turno A</option>
                <option>Turno B</option>
                <option>Turno C</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
      {datos.map(({ titulo, valor, color }) => (
        <div
          key={titulo}
          className="rounded-md border border-gray-300 shadow-md p-1 min-w-[120px]"
        >
          <div
            className={`${
              color.includes("text-") ? "bg-white" : color
            } text-white text-xs font-bold py-1 px-2 text-center rounded-t-md ${
              color.includes("text-") ? "" : "text-white"
            }`}
          >
            {titulo}
          </div>
          <div
            className={`text-center font-semibold text-lg py-2 ${
              color.includes("text-") ? color : "text-black"
            }`}
          >
            {valor}
          </div>
        </div>
      ))}

      {/* Ganancia Acumulada */}
      <div className="bg-pink-700 text-white p-3 rounded-lg border-2 border-pink-700 flex-2 w-full sm:w-auto">
        <div className="text-center font-bold mb-2">Ganancia Acumulada</div>
        <div className="flex gap-2 text-white">
          <div className="flex-1 bg-red-600 p-2 rounded text-center">
            Objetivo
            <br />
            <span className="font-semibold">S/ 500.00</span>
          </div>
          <div className="flex-1 bg-blue-700 p-2 rounded text-center">
            Real
            <br />
            <span className="font-semibold">S/ 460.00</span>
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Chart
            id="chartVentas"
            type="bar"
            title="Nº VENTAS"
            data={{
              labels: ["Lun", "Mar", "Mié", "Jue", "Vie"],
              datasets: [{
                label: "Ventas",
                data: [5, 10, 8, 12, 9],
                backgroundColor: "#ff0080"
              }]
            }}
          />

        <Chart
          id="chartDispersion"
          type="scatter"
          title="VENTAS"
          data={{
            datasets: [{
              label: 'Ventas x Día',
              data: [
                { x: 1, y: 1058 }, { x: 2, y: 1100 }, { x: 3, y: 1385 },
                { x: 4, y: 1134 }, { x: 5, y: 1792 }, { x: 6, y: 1136 },
                { x: 7, y: 1012 }, { x: 8, y: 1012 }, { x: 9, y: 1049 },
                { x: 10, y: 926 }, { x: 11, y: 1690 }
              ],
              backgroundColor: "#ff0080"
            }]
          }}
          options={{
            plugins: {
              datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#000',
                font: {
                  weight: 'bold'
                },
                formatter: (value) => `S/ ${value.y}` // Solo muestra el eje Y
              },
              title: {
                display: true,
                text: '',
                font: { size: 18 }
              },
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Día'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Monto (S/.)'
                }
              }
            }
          }}
          plugins={[ChartDataLabels]}
        />


          <Chart
            id="chartInventario"
            type="line"
            title="INVENTARIO SISTEMA"
            data={{
              labels: ["Ene", "Feb", "Mar", "Abr", "May"],
              datasets: [{
                label: "Inventario",
                data: [52059, 52913, 52611, 50686, 51985],
                borderColor: "#ff0080",
                fill: false
              }]
            }}
          />

          <Chart
            id="chartGanancias"
            type="line"
            title="GANANCIAS"
            data={{
              labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
              datasets: [{
                label: "Ganancias",
                data: [305, 228, 270, 223],
                borderColor: "#00b894",
                fill: false
              }]
            }}
          />

          <div className="col-span-1 sm:col-span-2">
            <Chart
              id="chartCreditos"
              type="bar"
              title="CRÉDITOS"
              data={{
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
                datasets: [{
                  label: "Créditos",
                  data: [8381, 8555, 8540,8794,8995],
                  backgroundColor: "#6c5ce7"
                }]
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;