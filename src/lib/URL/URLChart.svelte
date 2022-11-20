<script>
    /**
     * Libs
     */
    import Chart from 'chart.js';

    /**
     * Props
     */
    export let transition

    let data
    let info

    const createChart = () => {
        const labels = Object.keys(transition);
        info = Object.values(transition).map(e => e.length).reverse()
        data = {
            labels: labels.reverse(),
            datasets: [{
                label: 'Transitions',
                data: info,
                borderColor: '#5A31FF',
                fill: false,
            }]
        };
    }

    const create = (node) => {
        new Chart(node, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                       ticks: {
                           fontColor: "#CCC"
                       }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: "#CCC",
                            reverse: false,
                            stepSize: 1,
                            min: 0,
                            max: Math.max(...info) + 1
                        },
                    }]
                }
            }
        });
    }

    $: if (transition) createChart()
</script>

<div class="url__chart">
    <canvas use:create height="200px"></canvas>
</div>

<style lang="scss">
    .url__chart {
      height: 200px;
      width: 100%;

      canvas {
        width: 100%;
        height: 100%;
      }
    }
</style>
