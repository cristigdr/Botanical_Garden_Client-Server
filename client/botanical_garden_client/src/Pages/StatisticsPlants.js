import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import httpClient from "./httpClient";

export default function StatisticsPlants() {
    const chartContainerCarn = useRef(null);
    const chartInstanceCarn = useRef(null);
    const chartContainerZone = useRef(null);
    const chartInstanceZone = useRef(null);
    const [carnCount, setCarnCount] = useState([]);
    const [zoneCount, setZoneCount] = useState([]);

    useEffect(() => {
        async function fetchCarnCount() {
            try {
                const response = await httpClient.get(
                    "http://localhost:8080/getCarnCount"
                );
                setCarnCount(response.data);
                localStorage.setItem("carnCount", JSON.stringify(response.data)); // Store data in localStorage
            } catch (error) {
                console.error(error);
            }
        }

        fetchCarnCount();
    }, []);

    useEffect(() => {
        async function fetchZoneCount() {
            try {
                const response = await httpClient.get(
                    "http://localhost:8080/getZoneCount"
                );
                setZoneCount(response.data);
                localStorage.setItem("zoneCount", JSON.stringify(response.data)); // Store data in localStorage
            } catch (error) {
                console.error(error);
            }
        }

        fetchZoneCount();
    }, []);

    useEffect(() => {
        if (chartContainerCarn && chartContainerCarn.current) {
            // Destroy previous chart instance, if it exists
            if (chartInstanceCarn.current) {
                chartInstanceCarn.current.destroy();
            }

            const chartData = {
                labels: ["Nu", "Da"],
                datasets: [
                    {
                        data: carnCount.map((item) => item[1]),
                        backgroundColor: ["#40A5D1", "#FF5733"],
                        borderWidth: 1,
                    },
                ],
            };

            chartInstanceCarn.current = new Chart(
                chartContainerCarn.current,
                {
                    type: "pie",
                    data: chartData,
                }
            );
        }

    }, [carnCount]);

    useEffect(() => {
        if (chartContainerZone && chartContainerZone.current) {
            // Destroy previous chart instance, if it exists
            if (chartInstanceZone.current) {
                chartInstanceZone.current.destroy();
            }

            const chartData = {
                labels: ["D", "C", "B", "A"],
                datasets: [
                    {
                        data: zoneCount.map((item) => item[1]),
                        backgroundColor: ["#C70039","#FF5733","#FFC300","#DAF7A6"],
                        borderWidth: 1,
                    },
                ],
            };

            chartInstanceZone.current = new Chart(chartContainerZone.current, {
                type: "pie",
                data: chartData,
            });
        }

        return () => {
            if (chartInstanceCarn.current) {
                chartInstanceCarn.current.destroy();
            }
        };
    }, [zoneCount]);


    const chartStyles = {
        width: "100%",
        height: "100%",
        float: "left",
    };

    return (
        <div id="statsPlantsPage">
            <div id="charts">
                <div>
                    <h2>Plante Carnivore</h2>
                    <div style={chartStyles}>
                        <canvas ref={chartContainerCarn} />
                    </div>
                </div>

                <div>
                    <h2>Plante in zone</h2>
                    <div style={chartStyles}>
                        <canvas ref={chartContainerZone} />
                    </div>
                </div>
            </div>
        </div>
    );
}
