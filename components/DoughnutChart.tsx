"use client"
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJs.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: 'Banks',
                data: [8732, 2304, 2234],
                backgroundColor: ['#28B455', '#2D6A4F', '#207C4B']
            }
        ],
        labels: ['Bank 1', 'Bank 2', 'Bank 3'] 
    }
  return <Doughnut
   data = {data}
   options={{
    cutout: '59%',
    plugins: {
        legend: {
            display: false
        }
    }
   }}/>
}
export default DoughnutChart
