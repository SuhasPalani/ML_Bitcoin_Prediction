document.addEventListener('DOMContentLoaded', function() {
    // Initialize empty arrays to store time and price data
    let times = [];
    let prices = [];

    // Function to update the chart with new data
    function updateChart(newTime, newPrice) {
        // Add new data point to arrays
        times.push(newTime);
        prices.push(newPrice);

        // Limit the number of data points to display on the chart (e.g., 100)
        const maxDataPoints = 100;
        if (times.length > maxDataPoints) {
            times.shift();
            prices.shift();
        }

        // Update the Chart.js chart with new data
        chart.data.labels = times;
        chart.data.datasets[0].data = prices;
        chart.update();
    }

    // Function to fetch new data from the server and update the chart
    function fetchDataAndUpdateChart() {
        fetch('{{ url_for('static', filename='Bitcoin History.csv') }}')
            .then(response => response.text())
            .then(data => {
                // Parse CSV data
                const parsedData = Papa.parse(data, { header: true }).data;

                // Iterate through each row of data
                for (const row of parsedData) {
                    const newTime = row.Time;
                    const newPrice = parseFloat(row.Price);
                    updateChart(newTime, newPrice);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Call the fetchDataAndUpdateChart function periodically to fetch new data
    const updateInterval = 5000; // Update interval in milliseconds (e.g., 5 seconds)
    setInterval(fetchDataAndUpdateChart, updateInterval);

    // Create a Chart.js line chart
    const ctx = document.getElementById('live-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                label: 'Bitcoin Price',
                data: prices,
                fill: false,
                borderColor: 'blue',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            }
        }
    });
});
