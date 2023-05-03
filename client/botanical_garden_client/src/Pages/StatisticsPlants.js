import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function AddUser() {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            // Destroy previous chart instance, if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const chartData = {
                labels: ["Yes", "No"],
                datasets: [
                    {
                        data: [40, 60],
                        backgroundColor: ["#36a2eb", "#ff6384"],
                        borderWidth: 1,
                    },
                ],
            };

            chartInstance.current = new Chart(chartContainer.current, {
                type: "pie",
                data: chartData,
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    const chartStyles = {
        width: "40%",
        height: "40%",
        float: "left",
    };

    return (
        <div id="statsPlantsPage">

            <h2>Plante Carnivore</h2>
            <div style={chartStyles}>
                <canvas ref={chartContainer} />
            </div>

        </div>
    );
}
