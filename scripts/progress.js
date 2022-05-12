const c = document.getElementById('chart').getContext('2d');
let delayed;

const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul'
];

let gradient = c.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(58, 123, 213, 1)');
gradient.addColorStop(1, 'rgba(0, 210, 255, 0.3)');

const data = {
    labels,
    datasets: [
        {
            data: [20, 23, 34, 22, 25, 35, 40], //x-axis 
            label: 'Tasks This Year',
            fill: true,
            backgroundColor: gradient,
            borderColor: 'white',
            tension: 0.3
            //pointBackgroundColor: 
        },
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
        radius: 5,
        hitRadius: 20,
        hoverRadius: 20,
        maintainAspectRatio: false
    }
}

const chart = new Chart(c, config);