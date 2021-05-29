import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hometag',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  isLinear = false;
  secondFormGroup!: FormGroup;
  defaultTime = new Array<number>(12, 34, 0);//FIXME info-api

  studGroups: Array<any> = [
    // {value: 'group-0', viewValue: 'Undefined'},
    {value: 'group-1', viewValue: 'Group #1'},
    {value: 'group-2', viewValue: 'Group #2'},
  ];
  myDatePicker: any;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

}
