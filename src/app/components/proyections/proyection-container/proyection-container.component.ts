import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ScaleHttpService } from '../../../services/scale.service';
import moment, { min } from 'moment';
import { Producer } from '../../../models/producer';
import { ScalesData } from '../../../models/scale-data';
import { ProyectionTable } from '../../../models/proyection-table-response';

@Component({
  selector: 'app-proyection-container',
  templateUrl: './proyection-container.component.html',
  styleUrl: './proyection-container.component.scss'
})
export class ProyectionContainerComponent {

  items: MenuItem[] | undefined;
  cols?: any[];
  colsProducer?: any[];
  producers:Producer[] =[]
  visible: boolean = false;
  
  scales:ScalesData | undefined;
  constructor(private fb: FormBuilder, private scaleHttpService: ScaleHttpService) {
  }
  ngOnInit(): void {
    this.loadScales();
    this.items = [

      {
        label: 'Productor',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            command: () => this.addNewProducer(),
          }
        ]
      }
    ];

    this.colsProducer = [
      { field: 'municipio', header: 'municipio' },
      { field: 'productor', header: 'productor' },
      { field: 'nPlantas', header: 'nPlantas' },
      { field: 'fechaSiembra', header: 'fechaSiembra' },
      { field: 'altura', header: 'altura' },
      { field: 'coeficiente', header: 'coeficiente' },
      { field: 'exportacion', header: 'exportacion' },
      { field: 'expectedProduction', header: 'Expected Production'  } //expectedProduction
    ]
  }




  buildCols(from:number, to:number) {
    this.cols = []
    let month = from.toString().substring(4,6)
    let year = from.toString().substring(0,4)
    
    while (+from <= +to) {
      this.cols.push(
        { field: from, header: from }
      )
      if(month == "52"){
        month = "01";
        year = (+year + 1).toString();
      }else{
        month = (+month + 1).toString();
      }
      from = +(year + '' + (month.length == 1  ? '0' + month : month))
      
    }
    return this.cols;

  }

  addNewProducer(){
    this.visible = true
  }


  calculate(scales: ScalesData, form: Producer) {
    const scale = scales.scales.find(s => s.maximum_altitude > form.altura && s.minimum_altitude < form.altura)
    let initalProd = this.addDays(new Date(form.fechaSiembra), scale?.production_start_days ?? 0);
    const tableResponse: ProyectionTable[] = [];
    form.proyectionTableByJson = []
    form.proyectionCols= []
    const objectProcesed = {
      initialProd: initalProd,
      initialWeek: moment(initalProd).week()
    }
    form.expectedProduction = 0
    let newProyection:any = {}
    if (scale) {
      for (let week of scale.week_data) {

        const valueByWeek = week * form.nPlantas * (form.coeficiente / 100) * (form.exportacion / 100);
        const year = moment(initalProd).year();
        const weekOfDate = moment(initalProd).week()
        const valueTable: ProyectionTable = {
          value: valueByWeek,
          yearWeek: +(year + '' + (weekOfDate < 10 ? '0' + weekOfDate : weekOfDate)),
          yearWeekDesc: year + '-' + weekOfDate
        }
        tableResponse.push(valueTable);
        initalProd = moment(initalProd).add('1', 'weeks').toDate();
        form.expectedProduction += valueByWeek;
        form.proyectionCols?.push({ field: valueTable.yearWeek, header: valueTable.yearWeek })
        newProyection[valueTable.yearWeek] = valueTable.value;
      }
      
    }
    
    form.proyectionTableByJson.push(newProyection)
    this.producers.push(form);
  }

  
  addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }


  loadScales() {
    this.scaleHttpService.get().subscribe({
      next: response => {
        this.scales = response;
        this.createData();
      }
    })
  }

  createProducer(producer:Producer){
    this.visible = false;
    if(this.scales){
      this.calculate(this.scales, producer);
    }
    
  }

  // validateMinAndMaxDates(){
  //   let maxGlobal = 0;
  //   let minGlobal = Number.MAX_VALUE;
  //   for(let row of this.producers){
  //     const max = row.proyectionTable!.reduce((prev, curr) => prev.yearWeek > curr.yearWeek ? prev : curr).yearWeek;
  //     const min = row.proyectionTable!.reduce((prev, curr) => prev.yearWeek < curr.yearWeek ? prev : curr).yearWeek;
  //     if(max > maxGlobal){
  //       maxGlobal = max
  //     }

  //     if(min < minGlobal){
  //       minGlobal = min
  //     }
      
  //   }
  //   return this.buildCols(minGlobal, maxGlobal);
  // }

  createData(){
    const producer:Producer ={
        altura:2475,
        coeficiente:60,
        exportacion:60,
        fechaSiembra:moment('11/01/2022', 'MM/DD/YYYY').toDate(),
        municipio:'VENTAQUEMADA',
        nPlantas:30000,
        productor:'RODRIGO ROBINSON',
    }
    this.createProducer(producer);
  }

  
}
