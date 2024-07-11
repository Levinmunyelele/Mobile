import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-county',
  templateUrl: './county.page.html',
  styleUrls: ['./county.page.scss'],
})
export class CountyPage implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
 
  malariaChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      events: {
        render: function () {
          const chart = this as Highcharts.Chart & { customLabel?: Highcharts.SVGElement };
          const total = chart.series[0].points.reduce((sum, point) => sum + (point.y || 0), 0);
          const percentage = Math.round(((chart.series[0].points[0].y || 0) / total) * 100);
          if (!chart.customLabel) {
            chart.customLabel = chart.renderer.text(percentage + '%', chart.plotWidth / 2 + chart.plotLeft, chart.plotHeight / 2 + chart.plotTop)
              .attr({
                align: 'center',
                'font-size': '24px',
                'font-weight': 'bold'
              })
              .css({
                color: 'black'
              })
              .add();
          } else {
            chart.customLabel.attr({
              text: percentage + '%'
            });
          }
        }
      }
    },
    title: {
      text: undefined // Remove the title
    },
    credits: {
      enabled: false // Disable watermark
    },
    plotOptions: {
      pie: {
        size: '30%',
        innerSize: '50%',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Share',
      type: 'pie',
      data: [
        { name: 'Category 1', y: 30 },
        { name: 'Category 2', y: 70 }
      ]
    }]
  };
  
  tbChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      events: {
        render: function () {
          const chart = this as Highcharts.Chart & { customLabel?: Highcharts.SVGElement };
          const total = chart.series[0].points.reduce((sum, point) => sum + (point.y || 0), 0);
          const percentage = Math.round(((chart.series[0].points[0].y || 0) / total) * 100);
          if (!chart.customLabel) {
            chart.customLabel = chart.renderer.text(percentage + '%', chart.plotWidth / 2 + chart.plotLeft, chart.plotHeight / 2 + chart.plotTop)
              .attr({
                align: 'center',
                'font-size': '24px',
                'font-weight': 'bold'
              })
              .css({
                
                color: 'black'
              })
              .add();
          } else {
            chart.customLabel.attr({
              text: percentage + '%'
            });
          }
        }
      }
    }, title: {
      text: undefined // Remove the title
    },
    credits: {
      enabled: false // Disable watermark
    }, 
    plotOptions: {
      pie: {
        size: '30%',
        innerSize: '50%',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Share',
      type: 'pie',
      data: [
        { name: 'Category 1', y: 45 },
        { name: 'Category 2', y: 55 }
      ]
    }]
  };

  oxygenChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      events: {
        render: function () {
          const chart = this as Highcharts.Chart & { customLabel?: Highcharts.SVGElement };
          const total = chart.series[0].points.reduce((sum, point) => sum + (point.y || 0), 0);
          const percentage = Math.round(((chart.series[0].points[0].y || 0) / total) * 100);
          if (!chart.customLabel) {
            chart.customLabel = chart.renderer.text(percentage + '%', chart.plotWidth / 2 + chart.plotLeft, chart.plotHeight / 2 + chart.plotTop)
              .attr({
                align: 'center',
                'font-size': '24px',
                'font-weight': 'bold'
              })
              .css({
                color: 'black'
              })
              .add();
          } else {
            chart.customLabel.attr({
              text: percentage + '%'
            });
          }
        }
      }
    },
    title: {
      text: undefined // Remove the title
    },
    credits: {
      enabled: false // Disable watermark
    },
   
    plotOptions: {
      pie: {
        size: '30%',
        innerSize: '50%',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Share',
      type: 'pie',
      data: [
        { name: 'Category 1', y: 60 },
        { name: 'Category 2', y: 40 }
      ]
    }]
  };

  familyPlanningChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      events: {
        render: function () {
          const chart = this as Highcharts.Chart & { customLabel?: Highcharts.SVGElement };
          const total = chart.series[0].points.reduce((sum, point) => sum + (point.y || 0), 0);
          const percentage = Math.round(((chart.series[0].points[0].y || 0) / total) * 100);
          if (!chart.customLabel) {
            chart.customLabel = chart.renderer.text(percentage + '%', chart.plotWidth / 2 + chart.plotLeft, chart.plotHeight / 2 + chart.plotTop)
              .attr({
                align: 'center',
                'font-size': '24px',
                'font-weight': 'bold'
              })
              .css({
                color: 'black'
              })
              .add();
          } else {
            chart.customLabel.attr({
              text: percentage + '%'
            });
          }
        }
      }
    },
    title: {
      text: undefined // Remove the title
    },
    credits: {
      enabled: false // Disable watermark
    },
   
    plotOptions: {
      pie: {
        size: '30%',
        innerSize: '50%',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Share',
      type: 'pie',
      data: [
        { name: 'Category 1', y: 25 },
        { name: 'Category 2', y: 75 }
      ]
    }]
  };

  hivChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      events: {
        render: function () {
          const chart = this as Highcharts.Chart & { customLabel?: Highcharts.SVGElement };
          const total = chart.series[0].points.reduce((sum, point) => sum + (point.y || 0), 0);
          const percentage = Math.round(((chart.series[0].points[0].y || 0) / total) * 100);
          if (!chart.customLabel) {
            chart.customLabel = chart.renderer.text(percentage + '%', chart.plotWidth / 2 + chart.plotLeft, chart.plotHeight / 2 + chart.plotTop)
              .attr({
                align: 'center',
                'font-size': '24px',
                'font-weight': 'bold'
              })
              .css({
                color: 'black'
              })
              .add();
          } else {
            chart.customLabel.attr({
              text: percentage + '%'
            });
          }
        }
      }
    },  
    title: {
      text: undefined // Remove the title
    },
    credits: {
      enabled: false // Disable watermark
    },
   
   
    plotOptions: {
      pie: {
        size: '30%',
        innerSize: '50%',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Share',
      type: 'pie',
      data: [
        { name: 'Category 1', y: 50 },
        { name: 'Category 2', y: 50 }
      ]
    }]
  };

  mohChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      events: {
        render: function () {
          const chart = this as Highcharts.Chart & { customLabel?: Highcharts.SVGElement };
          const total = chart.series[0].points.reduce((sum, point) => sum + (point.y || 0), 0);
          const percentage = Math.round(((chart.series[0].points[0].y || 0) / total) * 100);
          if (!chart.customLabel) {
            chart.customLabel = chart.renderer.text(percentage + '%', chart.plotWidth / 2 + chart.plotLeft, chart.plotHeight / 2 + chart.plotTop)
              .attr({
                align: 'center',
                'font-size': '24px',
                'font-weight': 'bold'
              })
              .css({
                color: 'black'
              })
              .add();
          } else {
            chart.customLabel.attr({
              text: percentage + '%'
            });
          }
        }
      }
    },title: {
      text: undefined // Remove the title
    },
    credits: {
      enabled: false // Disable watermark
    },
   
   
    plotOptions: {
      pie: {
        size: '30%',
        innerSize: '50%',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Share',
      type: 'pie',
      data: [
        { name: 'Category 1', y: 35 },
        { name: 'Category 2', y: 65 }
      ]
    }]
  };

  constructor() { }


  ngOnInit() {
  }

}
