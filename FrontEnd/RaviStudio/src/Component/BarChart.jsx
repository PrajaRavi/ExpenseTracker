import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container w-[100%] h-[100%] relative top-[50px]">
      {/* <h2 style={{ textAlign: "center" }}>Bar Chart</h2> */}
      <Bar
      // width={'100%'}
      // height={'10%'}
        data={chartData}
        options={{
        
          animation:true,
          backgroundColor:'blue',
          responsive:true,
          maintainAspectRatio:true,
          
          
          plugins: {
            title: {
              display: false,
              text: "Today's expense Overview"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};