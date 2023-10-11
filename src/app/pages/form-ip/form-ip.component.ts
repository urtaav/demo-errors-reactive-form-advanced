import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

import { CalendarModule } from 'primeng/calendar';

import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { FormSubmitDirective } from 'src/app/common/directives/form-submit.directive';
import { ControlErrorsDirective } from 'src/app/common/directives/control-error.directive';
import { NgxValidators } from 'src/app/common/utils/ngx-validators';
import { ControlCounterDirective } from 'src/app/common/directives/control-counter.directive';
import { uniqueEmailValidator } from 'src/app/common/utils/custom-validator';
import { CustomValidatorService } from 'src/app/common/services/custom-validator.service';

interface City {
  name: string;
  code: string;
}

const primeModules = [
  ButtonModule,
  DropdownModule,
  InputTextareaModule,
  InputTextModule,
  CalendarModule
]

@Component({
  selector: 'app-form-ip',
  templateUrl: './form-ip.component.html',
  styleUrls: ['./form-ip.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ...primeModules,
    JsonPipe,
    NgClass,
    NgIf,
    FormSubmitDirective,
    ControlErrorsDirective,
    ControlCounterDirective
  ]
})
export class FormIpComponent implements OnInit {

  private readonly _formBuilder = inject(FormBuilder);
  private _customValidatorService = inject(CustomValidatorService);

  ipForm = this._formBuilder.group<any>({
    firstname: ['', [NgxValidators.required(),NgxValidators.minLength(4), NgxValidators.maxLength(100)]],
    lastname: ['', [NgxValidators.required()]],
    address: ['', [NgxValidators.required()]],
    city: ['', [NgxValidators.required(), NgxValidators.maxLength(20)]],
    state: ['', [NgxValidators.required()]],
    zip: ['', [NgxValidators.required()]],
    observations:[''],
    email: ['', [NgxValidators.required(), NgxValidators.email()], [uniqueEmailValidator(this._customValidatorService)]],
    web: ['',[NgxValidators.required(), NgxValidators.url('Introduzca una URL válida en el formato "http(s)://sitio.dominio".')]],
    date:['',NgxValidators.required()]
  });

  submitted: boolean = false;

  cities: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
  // getters 
  private getControl(controlName: string): FormControl {
    return this.ipForm.controls[controlName] as FormControl;
  }
  get frm() {
    return this.ipForm.controls;
  }
  get firstName(): FormControl {
    return this.getControl('firstname');
  }
  get lastName(): FormControl {
    return this.getControl('lastname');
  }
  get address(): FormControl {
    return this.getControl('address');
  }
  get city(): FormControl {
    return this.getControl('city');
  }
  get state(): FormControl {
    return this.getControl('state');
  }
  get zip(): FormControl {
    return this.getControl('zip');
  }
  get observations(): FormControl {
    return this.getControl('observations');
  }
  get web(): FormControl {
    return this.getControl('web');
  }
  get email(): FormControl {
    return this.getControl('email');
  }
  get date(): FormControl {
    return this.getControl('date');
  }


  onSubmit = () => {
    this.submitted = true;

    if (this.ipForm.invalid) {
      console.log("Los campos marcados con * son obligatorios")
      return;
    }
    console.log("form value", this.ipForm.value);

  }
}
