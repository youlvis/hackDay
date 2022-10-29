import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.css'],
})
export class PolarAreaChartComponent implements OnInit {
  dataR: any;
  evento:any;
  detEventoReal:any;
  detEventoEstAct:any;
  detEventoEstLlam:any;
  detEventoEstEsp:any;
  detEventoEstACW:any;
  usuariosAct:any=[];
  usuariosLlamada:any=[];
  usuariosEspera:any=[];
  usuariosACW:any=[];
  cantidad:Array<number>=[];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((res) => {
      this.setData(res);
      this.createChart();
    });

  }

  setData(res: any) {
    this.dataR = res.payload.data.onCreateHackathonEvents.event
    this.evento=JSON.parse(this.dataR)
    this.detEventoReal=this.evento.detail.events[0].detail.eventBody.service.users
    this.detEventoEstAct=this.evento.detail.events[0].detail.eventBody.data.metrics[1].usersId
    this.detEventoEstLlam=this.evento.detail.events[0].detail.eventBody.data.metrics[2].usersId
    this.detEventoEstEsp=this.evento.detail.events[0].detail.eventBody.data.metrics[3].usersId
    this.detEventoEstACW=this.evento.detail.events[0].detail.eventBody.data.metrics[4].usersId
    this.cantidad=[this.detEventoEstAct.length,this.detEventoEstLlam.length,this.detEventoEstEsp.length,this.detEventoEstACW.length]
    console.log(typeof(this.cantidad))
    //generando activos
    for(const i in this.detEventoEstAct){
      for(const x in this.detEventoReal){
        if(this.detEventoEstAct[i]==this.detEventoReal[x].id){
          this.usuariosAct.push([this.detEventoReal[x].id,this.detEventoReal[x].name,"Activo"])
        }
  
      }

    }
    //generando en llamada
    for(const i in this.detEventoEstLlam){
      for(const x in this.detEventoReal){
        if(this.detEventoEstLlam[i]==this.detEventoReal[x].id){
          this.usuariosLlamada.push([this.detEventoReal[x].id,this.detEventoReal[x].name,"En llamada"])
        }
  
      }

    }
    //en espera
    for(const i in this.detEventoEstEsp){
      for(const x in this.detEventoReal){
        if(this.detEventoEstEsp[i]==this.detEventoReal[x].id){
          this.usuariosEspera.push([this.detEventoReal[x].id,this.detEventoReal[x].name,"En espera"])
        }
  
      }

    }
    //en ACW
    for(const i in this.detEventoEstACW){
      for(const x in this.detEventoReal){
        if(this.detEventoEstACW[i]==this.detEventoReal[x].id){
          this.usuariosACW.push([this.detEventoReal[x].id,this.detEventoReal[x].name,"En llamada ACW"])
        }
  
      }

    }
  }

  public chart: any;
  colors = [
    'rgb(69,177,223)',
    'rgb(99,201,122)',
    'rgb(203,82,82)',
    'rgb(229,224,88)',
  ];
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'polarArea',
      data: {
        // values on X-Axis
        labels: ['Activo','En llamada', 'En espera', 'Llamadas WA'],
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
            text: 'Chart.js Polar Area Chart',
          },
        },
      },
    });
  }
}
