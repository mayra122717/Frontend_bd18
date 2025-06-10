import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ScatterController,
  BarController,
  LineController
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ScatterController,
  BarController,
  LineController
);

const Chart = ({ id, type, data, options = {}, title }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null); // <--- nueva referencia al gráfico

  useEffect(() => {
    const canvas = canvasRef.current;

    // 🔴 Destruir el gráfico anterior si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // ✅ Crear nuevo gráfico
    chartInstanceRef.current = new ChartJS(canvas, {
      type,
      data,
      options,
    });

    // Cleanup: destruir al desmontar
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [type, data, options]);

  return (
    <div className={`relative bg-white p-4 rounded-lg border-4 border-pink-700 min-h-[250px]`}>
      <div className="absolute top-[-16px] left-0 right-0 text-center bg-gradient-to-r from-pink-700 to-gray-800 text-white font-bold py-1 rounded-t">
        {title}
      </div>
      <canvas ref={canvasRef} id={id} className="mt-4"></canvas>
    </div>
  );
};

export default Chart;