document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from the CSV file
    fetch('static/Bitcoin History.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const parsedData = Papa.parse(data, { header: true }).data;

            // Extract time and price data for the chart
            const times = parsedData.map(row => row.Time);
            const prices = parsedData.map(row => parseFloat(row.Price));

            // Create a Chart.js line chart
            createChart(times, prices);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to create Chart.js line chart
    function createChart(times, prices) {
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
    }

    // Add event listeners for buy and sell buttons
    document.getElementById('buy-button').addEventListener('click', function() {
        // Your buy logic here
        console.log('Buy button clicked');
    });

    document.getElementById('sell-button').addEventListener('click', function() {
        // Your sell logic here
        console.log('Sell button clicked');
    });
});
