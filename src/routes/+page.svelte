<script lang="ts">
  import type { PageData } from './$types';
  import { Bar } from 'svelte-chartjs';
  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';

  // data returned from +page.server.js
  export let data: PageData;

  // Result type
  type Result = {
    type: string,
    supabaseTime: number,
    railwayTime: number,
    renderTime: number,
  };

  // Chart data type
  type ChartData = {
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      backgroundColor: string[],
      borderWidth: number,
      borderColor: string[]
    }[],
    
  };

  // Chart data
  let currQueryResult: Result;
  let allQueryResults = data.results.filter(r => r.type === 'Query');
  let currInsertResult: Result;
  let allInsertResults = data.results.filter(r => r.type === 'Insert');

  let currQueryChartData: ChartData;
  let allQueryChartData: ChartData;
  let currInsertChartData: ChartData;
  let allInsertChartData: ChartData;

  // chart UI state
  let showCharts = false;

  // test-making function
  async function test() {
    let response = await fetch('/api/common/test/query');
    currQueryResult = await response.json() as unknown as Result;
    response = await fetch('/api/common/test/insert');
    currInsertResult = await response.json() as unknown as Result;
    // current query chart
    currQueryChartData = {
      labels: ['Supabase', 'Railway.app', 'Render'],
      datasets: [
        {
          label: 'Request time [ms]',
          data: [
            currQueryResult.supabaseTime,
            currQueryResult.railwayTime,
            currQueryResult.renderTime
          ],
          backgroundColor: [
            // green
            'rgba(113, 205, 205,0.4)',
            // purple
            'rgba(170, 128, 252,0.4)',
            // blue
            'rgba(98,  182, 239,0.4)',
          ],
          borderWidth: 2,
          borderColor: [
            // green
            'rgba(113, 205, 205, 1)',
            // purple
            'rgba(170, 128, 252, 1)',
            // blue
            'rgba(98,  182, 239, 1)',
          ]
        }
      ],
    };

    // historic query chart
    let supabaseAllTime = 0;
    let railwayAllTime = 0;
    let renderAllTime = 0;

    allQueryResults.forEach((res) => {
      supabaseAllTime += res.supabaseTime;
      railwayAllTime += res.railwayTime;
      renderAllTime += res.renderTime;
    });

    // add the fresh-made test result
    supabaseAllTime += currQueryResult.supabaseTime;
    railwayAllTime += currQueryResult.railwayTime;
    renderAllTime += currQueryResult.renderTime;

    supabaseAllTime = supabaseAllTime / (allQueryResults.length + 1);
    railwayAllTime = railwayAllTime / (allQueryResults.length + 1) ;
    renderAllTime = renderAllTime / (allQueryResults.length + 1);

    allQueryChartData = {
      labels: ['Supabase', 'Railway.app', 'Render'],
      datasets: [
        {
          label: 'Request time [ms]',
          data: [
            supabaseAllTime,
            railwayAllTime,
            renderAllTime
          ],
          backgroundColor: [
            // green
            'rgba(113, 205, 205,0.4)',
            // purple
            'rgba(170, 128, 252,0.4)',
            // blue
            'rgba(98,  182, 239,0.4)',
          ],
          borderWidth: 2,
          borderColor: [
            // green
            'rgba(113, 205, 205, 1)',
            // purple
            'rgba(170, 128, 252, 1)',
            // blue
            'rgba(98,  182, 239, 1)',
          ]
        }
      ],
    };

    // current insert chart
    currInsertChartData = {
      labels: ['Supabase', 'Railway.app', 'Render'],
      datasets: [
        {
          label: 'Request time [ms]',
          data: [
            currInsertResult.supabaseTime,
            currInsertResult.railwayTime,
            currInsertResult.renderTime
          ],
          backgroundColor: [
            // green
            'rgba(113, 205, 205,0.4)',
            // purple
            'rgba(170, 128, 252,0.4)',
            // blue
            'rgba(98,  182, 239,0.4)',
          ],
          borderWidth: 2,
          borderColor: [
            // green
            'rgba(113, 205, 205, 1)',
            // purple
            'rgba(170, 128, 252, 1)',
            // blue
            'rgba(98,  182, 239, 1)',
          ]
        }
      ],
    };

    // historic insert chart
    supabaseAllTime = 0;
    railwayAllTime = 0;
    renderAllTime = 0;

    allInsertResults.forEach((res) => {
      supabaseAllTime += res.supabaseTime;
      railwayAllTime += res.railwayTime;
      renderAllTime += res.renderTime;
    });

    // add the fresh-made test result
    supabaseAllTime += currInsertResult.supabaseTime;
    railwayAllTime += currInsertResult.railwayTime;
    renderAllTime += currInsertResult.renderTime;

    supabaseAllTime = supabaseAllTime / (allInsertResults.length + 1);
    railwayAllTime = railwayAllTime / (allInsertResults.length + 1) ;
    renderAllTime = renderAllTime / (allInsertResults.length + 1);

    allInsertChartData = {
      labels: ['Supabase', 'Railway.app', 'Render'],
      datasets: [
        {
          label: 'Request time [ms]',
          data: [
            supabaseAllTime,
            railwayAllTime,
            renderAllTime
          ],
          backgroundColor: [
            // green
            'rgba(113, 205, 205,0.4)',
            // purple
            'rgba(170, 128, 252,0.4)',
            // blue
            'rgba(98,  182, 239,0.4)',
          ],
          borderWidth: 2,
          borderColor: [
            // green
            'rgba(113, 205, 205, 1)',
            // purple
            'rgba(170, 128, 252, 1)',
            // blue
            'rgba(98,  182, 239, 1)',
          ]
        }
      ],
    };

    showCharts = true;
  }

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
</script>

<div class="flex flex-col text-2xl">
  <h1 class="flex justify-center text-3xl font-bold py-8">DB benchmark</h1>
  <h2 class="flex justify-center">This app tests performance of free tier PostgreSQL providers:</h2>
  <ul class="flex flex-col justify-center items-center pt-4">
    <li><a href="https://supabase.com/" class="hover:text-blue-500">Supabase</a></li>
    <li><a href="https://railway.app/" class="hover:text-blue-500">Railway.app</a></li>
    <li><a href="https://render.com/" class="hover:text-blue-500">Render</a></li>
  </ul>
  <main class="flex flex-col justify-center items-center py-8">
    <button on:click={() => test()}
      class="bg-red-500 text-gray-100 text-3xl rounded-md py-4 px-6 shadow-md hover:opacity-75"
    >
      Test
    </button>
    {#if showCharts}
    <div class="flex flex-col">
      <div class="flex flex-row">
        <div class="flex flex-col justify-center items-center py-8 px-4">
          <h2>Query test</h2>
          <Bar data={currQueryChartData} options={{ responsive: true }} />
        </div>
        <div class="flex flex-col justify-center items-center py-8 px-4">
          <h2>All-time query tests</h2>
          <Bar data={allQueryChartData} options={{ responsive: true }} />
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col justify-center items-center py-8 px-4">
          <h2>Insert test</h2>
          <Bar data={currInsertChartData} options={{ responsive: true }} />
        </div>
        <div class="flex flex-col justify-center items-center py-8 px-4">
          <h2>All-time insert tests</h2>
          <Bar data={allInsertChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
    {/if}
  </main>
</div>
