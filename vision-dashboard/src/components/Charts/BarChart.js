/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { barChartData, barChartOptions } = this.props;

    this.setState({
      chartData: barChartData,
      chartOptions: barChartOptions,
    });
  }

  render() {
    const barChartDataDashboard = [
      {
        name: "Before Initiative",
        data: [80, 70, 30, 40], // 4 values
      },
      {
        name: "After Initiative",
        data: [30, 50, 80, 75], // 4 values (same length as above)
      },
    ];

    
    const barChartOptionsDashboard = {
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          // borderRadius: 5,
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ["CO2", "Energy", "Score", "Efficiency"], // 4 categories
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
            fontFamily: "Plus Jakarta Display",
          },
        },
      },
      yaxis: {
        title: { text: "Impact Score (%)", style: { color: "#fff", fontFamily: "Plus Jakarta Display", } },
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
            fontFamily: "Plus Jakarta Display",
          },
        },
      },
      grid: { show: false },
      tooltip: {
        theme: "dark",
        y: { formatter: (val) => `${val}% Impact` },
      },
      colors: ["#012e2b", "#00B38C"], // Red for before, Green for after
      legend: {
        position: "top",
        labels: { colors: "#fff" },
      },
    };
    
    
    return (
      <Chart
      options={barChartOptionsDashboard}
      series={barChartDataDashboard}
      type="bar"
      width="100%"
      height="160px"
    />
    );
  }
}

export default BarChart;
