import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectionResponse } from '../../../models/proyection-response';
import { ScaleHttpService } from '../../../services/scale.service';
import { ScaleData, ScalesData } from '../../../models/scale-data';
import moment from 'moment';
import { ProyectionTable } from '../../../models/proyection-table-response';
import { Producer } from '../../../models/producer';

@Component({
  selector: 'app-proyection-form',
  templateUrl: './proyection-form.component.html',
  styleUrl: './proyection-form.component.scss'
})
export class ProyectionFormComponent {

  @Output() createProducer:EventEmitter<Producer> = new EventEmitter<Producer>();
  form: FormGroup;
  
  municipioOptions: string[] = [
    'VENTAQUEMADA',
    'SIBATE',
    'BUENAVISTA',
    'SIMIJACA',
    'COCORNA',
    'GRANADA',
    'SILVANIA',
    'GUASCA',
    'GRANADA',
    'SIBATE',
    'GUAVIO',
    'SONSON'
  ];

  scales: ScalesData | null = null;
  


  objectProcesed: ProyectionResponse | null = null;
  
  

  constructor(private fb: FormBuilder, private scaleHttpService: ScaleHttpService) {
    this.form = this.fb.group({
      municipio: ['', Validators.required],
      productor: ['', Validators.required],
      nPlantas: ['', Validators.required],
      fechaSiembra: ['', Validators.required],
      altura: ['', Validators.required],
      coeficiente: ['', Validators.required],
      exportacion: ['', Validators.required]
    });

    

  }

  ngOnInit(): void {
    
  }


  submit() {
    if (this.form.valid) {
      // Handle form submission
      this.createProducer.emit(this.form.value)
    } else {
      // Handle form validation errors
      alert('Form is invalid');
    }
  }
}
