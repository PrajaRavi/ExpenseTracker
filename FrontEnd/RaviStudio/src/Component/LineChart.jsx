import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="chart-container w-[100%] h-[100%]">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
      
      color="blue"
    
        data={chartData}
        options={{
          responsive:true,

          maintainAspectRatio:false,
          backgroundColor:[
            '#54ff1c',
            '#54ff1c',
            '#54ff1c',
            '#54ff1c',
            '#54ff1c',
          ],
          borderColor:[
            '#54ff1c',
            '#54ff1c',
            '#54ff1c',
            '#54ff1c',
            '#54ff1c',
          ],
          plugins: {
            title: {
              display: false,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;