import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../service/graphics.service';
import {concatMap,delay} from 'rxjs/operators';
import {of ,Subscription} from 'rxjs';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {

  bitcoin;
  ethereum;
  dogecoin;
  data;
  rate: any;
  rate$: Subscription;
  Highcharts: typeof Highcharts = Highcharts;

  charDataBitcoin: any[] = [0];
  charDataEthereum: any[] = [0];
  charDataDogecoin: any[] = [0];
  charDataLitecoin: any[] = [0];
  chartOptions: any;
  pieOptions: any;
  barOptions: any;

  constructor(private graphicsService: GraphicsService) { }

  ngOnInit() {
    this.getCryptoCoin();
  }

  getCryptoCoin(){
   
    this.graphicsService.socket.pipe(
      concatMap(item => of (item).pipe(delay(3000)))
      ).subscribe(data => {
        this.rate = data;
        if (!isNaN(this.rate.bitcoin))
          this.charDataBitcoin.push(Number(this.rate.bitcoin))

        if (!isNaN(this.rate.ethereum))
          this.charDataEthereum.push(Number(this.rate.ethereum))
        
        if (!isNaN(this.rate.dogecoin))
          this.charDataDogecoin.push(Number(this.rate.dogecoin))
        
        if (!isNaN(this.rate.litecoin))
          this.charDataLitecoin.push(Number(this.rate.litecoin))

      this.lineChart();
      //this.pieChart();
      this.barChart();
    })
  };

  lineChart() {
    this.chartOptions = {
      chart: {
        type: "line",
        zoomType: 'x'
      },
      title: {
        text: "Grafico de linha",
      },
      yAxis: {
        title: {
            text: 'Comparação das criptomoedas em linha'
          }
      },
      series: [{
        name: 'Bitcoin',
        data: this.charDataBitcoin
      }, {
        name: 'Ethereum',
        data: this.charDataEthereum
      }, {
        name: 'Dogecoin',
        data: this.charDataDogecoin
      }, {
        name: 'Litecoin',
        data: this.charDataLitecoin
    
      }, ],
    };
  }

  barChart() {
    this.barOptions = {
      chart: {
        type: 'column'
      },
      title: {
          text: 'Grafico de barra'
      },
     
      accessibility: {
          announceNewData: {
              enabled: true
          }
      },
      xAxis: {
          type: 'category'
      },
      yAxis: {
          title: {
              text: 'Comparação das criptomoedas em barra'
          }

      },
      legend: {
          enabled: false
      },
      plotOptions: {
          series: {
              borderWidth: 0,
              dataLabels: {
                  enabled: true,
              }
          }
      },

      tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b>'
      },

      series: [
          {
              name: "Coins",
              colorByPoint: true,
              data: [
                  {
                      name: "Bitcoin",
                      y: this.charDataBitcoin[this.charDataBitcoin.length - 1],

                  },
                  {
                      name: "Ethereum",
                      y: this.charDataEthereum[this.charDataEthereum.length - 1],

                  },
                  {
                      name: "Dogecoin",
                      y: this.charDataDogecoin[this.charDataDogecoin.length - 1],

                  },
                  {
                      name: "Litecoin",
                      y: this.charDataLitecoin[this.charDataLitecoin.length - 1],

                  }
              ]
          }
      ],
      // drilldown: {Valor das Criptomoedas atualizadas em tempo real
      //     series: [
      //         {
      //             name: "Chrome",
      //             id: "Chrome",
      //             data: [
      //                 [
      //                     "v65.0",
      //                     0.1
      //                 ]
      //             ]
      //         },
      //         {
      //             name: "Firefox",
      //             id: "Firefox",
      //             data: [
      //                 [
      //                     "v58.0",
      //                     1.02
      //                 ],
      //             ]
      //         },
      //         {
      //             name: "Internet Explorer",
      //             id: "Internet Explorer",
      //             data: [
      //                 [
      //                     "v11.0",
      //                     6.2
      //                 ]
      //             ]
      //         },
      //         {
      //             name: "Safari",
      //             id: "Safari",
      //             data: [
      //                 [
      //                     "v11.0",
      //                     3.39
      //                 ]
      //             ]
      //         }
      //     ]

      // }
    }  
  }
}