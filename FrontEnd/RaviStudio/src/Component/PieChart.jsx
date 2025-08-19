import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="chart-container w-[300px] h-[300px]">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              
              // text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;