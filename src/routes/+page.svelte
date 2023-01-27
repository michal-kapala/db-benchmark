<script lang="ts">
  import type { PageData } from './$types';
  import { Bar, Line } from 'svelte-chartjs';
  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
  } from 'chart.js';
    import { makeLineChartData } from '$lib/utils';
    import type { BarChartData } from '$lib/utils';
    import type { Result } from '@prisma/client';

  // data returned from +page.server.js
  export let data: PageData;

  // Chart data
  let currQueryResult: Result;
  let allQueryResults = data.results.filter(r => r.type === 'Query') as Result[];
  let currInsertResult: Result;
  let allInsertResults = data.results.filter(r => r.type === 'Insert') as Result[];

  let sampleCount = data.results.length;

  let currQueryChartData: BarChartData;
  let allQueryChartData: BarChartData;
  let currInsertChartData: BarChartData;
  let allInsertChartData: BarChartData;
  
  let queryHourAvgSupabase: number[] = [];
  let queryHourAvgRailway: number[] = [];
  let queryHourAvgRender: number[] = [];
  let insertHourAvgSupabase: number[] = [];
  let insertHourAvgRailway: number[] = [];
  let insertHourAvgRender: number[] = [];

  // chart UI state
  let showCharts = false;

  // test-making function
  async function test() {
    // refresh sample pool
    let response = await fetch('/api/results');
    let newResults = await response.json() as Result[];
    sampleCount = newResults.length;
    allQueryResults = newResults.filter(r => r.type === 'Query');
    allInsertResults = newResults.filter(r => r.type === 'Insert');
    // perform tests
    response = await fetch('/api/common/test/query');
    currQueryResult = await response.json() as unknown as Result;
    response = await fetch('/api/common/test/insert');
    currInsertResult = await response.json() as unknown as Result;
    sampleCount += 2;
    
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
            'rgba(113, 205, 205, 0.4)',
            // purple
            'rgba(170, 128, 252, 0.4)',
            // blue
            'rgba(98, 182, 239, 0.4)',
          ],
          borderWidth: 2,
          borderColor: [
            // green
            'rgba(113, 205, 205, 1)',
            // purple
            'rgba(170, 128, 252, 1)',
            // blue
            'rgba(98, 182, 239, 1)',
          ]
        }
      ],
    };

    // query results sorted by hour
    var queriesByHour: Result[][] = [];

    for(let i = 0; i < 24; i++)
      queriesByHour.push([]);
    
    // sort results by hour
    allQueryResults.forEach((res) => {
      const date = new Date(res.createdAt);
      const hour = date.getHours();
      queriesByHour[hour].push(res);
    });

    // calculate avg for every hour
    
    queriesByHour.forEach((resList) => {
      let supabaseAvg = 0;
      let railwayAvg = 0;
      let renderAvg = 0;
      resList.forEach(res => {
        supabaseAvg += res.supabaseTime;
        railwayAvg += res.railwayTime;
        renderAvg += res.renderTime;
      });
      if(resList.length > 0) {
        supabaseAvg /= resList.length;
        railwayAvg /= resList.length;
        renderAvg /= resList.length;
      } else {
        supabaseAvg = 0;
        railwayAvg = 0;
        renderAvg = 0;
      }

      queryHourAvgSupabase.push(supabaseAvg);
      queryHourAvgRailway.push(railwayAvg);
      queryHourAvgRender.push(renderAvg);
    });

    // insert results sorted by hour
    var insertsByHour: Result[][] = [];

    for(let i = 0; i < 24; i++)
      insertsByHour.push([]);
    
    // sort results by hour
    allInsertResults.forEach((res) => {
      const date = new Date(res.createdAt);
      const hour = date.getHours();
      insertsByHour[hour].push(res);
    });

    // calculate avg for every hour
    
    insertsByHour.forEach((resList) => {
      let supabaseAvg = 0;
      let railwayAvg = 0;
      let renderAvg = 0;
      resList.forEach(res => {
        supabaseAvg += res.supabaseTime;
        railwayAvg += res.railwayTime;
        renderAvg += res.renderTime;
      });
      if(resList.length > 0) {
        supabaseAvg /= resList.length;
        railwayAvg /= resList.length;
        renderAvg /= resList.length;
      } else {
        supabaseAvg = 0;
        railwayAvg = 0;
        renderAvg = 0;
      }

      insertHourAvgSupabase.push(supabaseAvg);
      insertHourAvgRailway.push(railwayAvg);
      insertHourAvgRender.push(renderAvg);
    });

    showCharts = true;
  }

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
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
          <h2>All-time avg query</h2>
          <Bar data={allQueryChartData} options={{ responsive: true }} />
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col justify-center items-center py-8 px-4">
          <h2>Insert test</h2>
          <Bar data={currInsertChartData} options={{ responsive: true }} />
        </div>
        <div class="flex flex-col justify-center items-center py-8 px-4">
          <h2>All-time avg insert</h2>
          <Bar data={allInsertChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center py-8 px-4">
      <h2>Avg query time by hour [ms]</h2>
      <div class="chart-container" style="position: relative; height:300px; width:600px">
        <Line data={makeLineChartData(queryHourAvgSupabase, queryHourAvgRailway, queryHourAvgRender)} options={{ responsive: true }} />
      </div>
    </div>
    <div class="flex flex-col justify-center items-center py-8 px-4">
      <h2>Avg insert time by hour [ms]</h2>
      <div class="chart-container" style="position: relative; height:300px; width:600px">
        <Line data={makeLineChartData(insertHourAvgSupabase, insertHourAvgRailway, insertHourAvgRender)} options={{ responsive: true }} />
      </div>
    </div>
    <h2 class="flex justify-center items-center">Samples: {sampleCount}</h2>
    {/if}
  </main>
</div>
