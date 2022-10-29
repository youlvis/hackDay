import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from 'src/service/data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.css'],
})
export class PolarAreaChartComponent implements OnInit {
  dataR: any;
  evento: any;
  detEventoReal: any;
  detEventoEstAct: any;
  detEventoEstLlam: any;
  detEventoEstEsp: any;
  detEventoEstACW: any;
  usuariosAct: any = [];
  usuariosLlamada: any = [];
  usuariosEspera: any = [];
  usuariosACW: any = [];
  cantidad: Array<number> = [];
  numEventos: any = [];
  numLlamadas: any;
  tiempoACW: any;
  numVentas: any;
  numLlamadasPro: any;
  numErrores: any;
  cont: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cont = 1;
    if (this.cont==1) {
      this.dataService.getData().subscribe((res) => {
        this.setData(res);
        this.createChart();
        this.createChartEventos();
        this.createChartLlamadas();
        this.createChartTiempoACW();
        this.createChartVentas();
        this.createLlamProg();
        this.createErrores();
      });
    }
    interval(10000).subscribe((x) => {
      this.dataService.getData().subscribe((res) => {
        this.setData(res);
        this.createChart();
        this.createChartEventos();
        this.createChartLlamadas();
        this.createChartTiempoACW();
        this.createChartVentas();
        this.createLlamProg();
        this.createErrores();
      });
      this.cont++;
    });

  }

  setData(res: any) {

    this.usuariosAct=[];
    this.usuariosLlamada= [];
    this.usuariosEspera= [];
    this.usuariosACW=[];
    this.cantidad=[];
    this.numEventos = [];
    this.numLlamadas=[];
    this.tiempoACW=[];
    this.numVentas=[];
    this.numLlamadasPro=[];
    this.numErrores=[];
  
    this.dataR = res.payload.data.onCreateHackathonEvents.event;
    this.evento = JSON.parse(this.dataR);
    this.detEventoReal =
      this.evento.detail.events[0].detail.eventBody.service.users;
    this.detEventoEstAct =
      this.evento.detail.events[0].detail.eventBody.data.metrics[1].usersId;
    this.detEventoEstLlam =
      this.evento.detail.events[0].detail.eventBody.data.metrics[2].usersId;
    this.detEventoEstEsp =
      this.evento.detail.events[0].detail.eventBody.data.metrics[3].usersId;
    this.detEventoEstACW =
      this.evento.detail.events[0].detail.eventBody.data.metrics[4].usersId;
    this.cantidad = [
      this.detEventoEstAct.length,
      this.detEventoEstLlam.length,
      this.detEventoEstEsp.length,
      this.detEventoEstACW.length,
    ];

    this.numEventos = [
      this.evento.detail.events[1].detail.eventBody.data.metrics[0].stats.count,
      this.evento.detail.events[1].detail.eventBody.data.metrics[0].stats.sum,
    ];
    this.numLlamadas = [
      this.evento.detail.events[1].detail.eventBody.data.metrics[1].stats.count,
      this.evento.detail.events[1].detail.eventBody.data.metrics[0].stats.sum,
      this.evento.detail.events[1].detail.eventBody.data.metrics[1].stats.min,
      this.evento.detail.events[1].detail.eventBody.data.metrics[1].stats.max,
    ];
    this.tiempoACW = [
      this.evento.detail.events[1].detail.eventBody.data.metrics[2].stats.count,
      this.evento.detail.events[1].detail.eventBody.data.metrics[2].stats.sum,
      this.evento.detail.events[1].detail.eventBody.data.metrics[2].stats.min,
      this.evento.detail.events[1].detail.eventBody.data.metrics[2].stats.max,
    ];
    this.numVentas = [
      this.evento.detail.events[1].detail.eventBody.data.metrics[3].stats.count,
      this.evento.detail.events[1].detail.eventBody.data.metrics[3].stats.sum,
      this.evento.detail.events[1].detail.eventBody.data.metrics[3].stats.min,
      this.evento.detail.events[1].detail.eventBody.data.metrics[3].stats.max,
    ];
    this.numLlamadasPro = [
      this.evento.detail.events[1].detail.eventBody.data.metrics[4].stats.count,
      this.evento.detail.events[1].detail.eventBody.data.metrics[4].stats.sum,
      this.evento.detail.events[1].detail.eventBody.data.metrics[4].stats.min,
      this.evento.detail.events[1].detail.eventBody.data.metrics[4].stats.max,
    ];
    this.numErrores = [
      this.evento.detail.events[1].detail.eventBody.data.metrics[5].stats.count,
      this.evento.detail.events[1].detail.eventBody.data.metrics[5].stats.sum,
      this.evento.detail.events[1].detail.eventBody.data.metrics[5].stats.min,
      this.evento.detail.events[1].detail.eventBody.data.metrics[5].stats.max,
    ];

    console.log(typeof this.cantidad);
    //generando activos
    for (const i in this.detEventoEstAct) {
      for (const x in this.detEventoReal) {
        if (this.detEventoEstAct[i] == this.detEventoReal[x].id) {
          this.usuariosAct.push([
            this.detEventoReal[x].id,
            this.detEventoReal[x].name,
            'Activo',
          ]);
        }
      }
    }
    //generando en llamada
    for (const i in this.detEventoEstLlam) {
      for (const x in this.detEventoReal) {
        if (this.detEventoEstLlam[i] == this.detEventoReal[x].id) {
          this.usuariosLlamada.push([
            this.detEventoReal[x].id,
            this.detEventoReal[x].name,
            'En llamada',
          ]);
        }
      }
    }
    //en espera
    for (const i in this.detEventoEstEsp) {
      for (const x in this.detEventoReal) {
        if (this.detEventoEstEsp[i] == this.detEventoReal[x].id) {
          this.usuariosEspera.push([
            this.detEventoReal[x].id,
            this.detEventoReal[x].name,
            'En espera',
          ]);
        }
      }
    }
    //en ACW
    for (const i in this.detEventoEstACW) {
      for (const x in this.detEventoReal) {
        if (this.detEventoEstACW[i] == this.detEventoReal[x].id) {
          this.usuariosACW.push([
            this.detEventoReal[x].id,
            this.detEventoReal[x].name,
            'En llamada ACW',
          ]);
        }
      }
    }
  }

  public chart: any = null;
  colors = [
    'rgb(69,177,223)',
    'rgb(99,201,122)',
    'rgb(203,82,82)',
    'rgb(229,224,88)',
  ];
  createChart() {
    if (this.chart) {
      this.chart.destroy();
      }
    this.chart = new Chart('MyChart', {
      type: 'polarArea',
      data: {
        // values on X-Axis
        labels: ['Activo', 'En llamada', 'En espera', 'Llamadas WA'],
        datasets: [
          {
            data: this.cantidad,
            backgroundColor: this.colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
      },
    });
  }

  public chartEventos: any;
  createChartEventos() {
    if (this.chartEventos) {
      this.chartEventos.destroy();
      }
    this.chartEventos = new Chart('chartEventos', {
      type: 'bar',
      data: {
        labels: ['Count', 'Sum'],
        datasets: [
          {
            label: 'Numero de eventos',
            data: this.numEventos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
      },
    });
  }

  public chartLlamadas: any;
  createChartLlamadas() {
    if (this.chartLlamadas) {
      this.chartLlamadas.destroy();
      }
    this.chartLlamadas = new Chart('chartLlamadas', {
      type: 'bar',
      data: {
        labels: ['Count', 'Sum', 'Min', 'Max'],
        datasets: [
          {
            label: 'Numero de llamadas',
            data: this.numLlamadas,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
      },
    });
  }

  public chartTiempoACW: any;
  createChartTiempoACW() {
    if (this.chartTiempoACW) {
      this.chartTiempoACW.destroy();
      }
    this.chartTiempoACW = new Chart('chartTiempoACW', {
      type: 'bar',
      data: {
        labels: ['Count', 'Sum', 'Min', 'Max'],
        datasets: [
          {
            label: 'Tiempo ACW',
            data: this.tiempoACW,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
      },
    });
  }
  public chartVentas: any;
  createChartVentas() {
    if (this.chartVentas) {
      this.chartVentas.destroy();
      }
    this.chartVentas = new Chart('chartVentas', {
      type: 'bar',
      data: {
        labels: ['Count', 'Sum', 'Min', 'Max'],
        datasets: [
          {
            label: 'Número de ventas',
            data: this.numVentas,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
      },
    });
  }

  public chartLlamProg: any;
  createLlamProg() {
    if (this.chartLlamProg) {
      this.chartLlamProg.destroy();
      }
    this.chartLlamProg = new Chart('chartLlamProg', {
      type: 'bar',
      data: {
        labels: ['Count', 'Sum', 'Min', 'Max'],
        datasets: [
          {
            label: 'Llamadas programadas',
            data: this.numLlamadasPro,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
      },
    });
  }

  public chartErrores: any;
  createErrores() {
    if (this.chartErrores) {
      this.chartErrores.destroy();
      }
    this.chartErrores = new Chart('chartErrores', {
      type: 'bar',
      data: {
        labels: ['Count', 'Sum', 'Min', 'Max'],
        datasets: [
          {
            label: 'Errores genéricos',
            data: this.numErrores,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
      },
    });
  }
}
