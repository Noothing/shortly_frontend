<script>
    /**
     * Libs
     */
    import Chart from 'chart.js';

    /**
     * Props
     */
    export let transition = []

    let data
    let info

    const createChart = () => {
        const labels = Object.keys(transition).reverse()
        info = Object.values(transition).map(e => e.length).reverse()
        console.log(labels, info)
        data = {
            labels: labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: info,
                    backgroundColor: ['#dfc731', '#ea88d8', '#97698e', '#8464a0', '#cea9bc']
                }
            ]
        };
    }

    const create = (node) => {
        new Chart(node, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Pie Chart'
                    }
                }
            }
        });
    }

    $: if ((Object.keys(transition) ?? []).length > 0) createChart()
</script>

<div class="url__chart">
    {#if data}
        <canvas use:create height="200px"></canvas>
    {/if}
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
