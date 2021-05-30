import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacadeService } from '../../core/services/facade.service';
import { InfoApi } from '../../core/model/info-api';

@Component({
  selector: 'app-hometag',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  readonly IS_LINEAR = false;
  private _infoApi: InfoApi | undefined;

  selectForm!: FormGroup;
  dateTimeForm!: FormGroup;

  studGroups: Array<any> = [
    // {value: 'group-0', viewValue: 'Undefined'},
    {value: 'group-1', viewValue: 'StudGroup #1'},
    {value: 'group-2', viewValue: 'StudGroup #2'},
  ];

  constructor(
    private _facade: FacadeService,
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this._facade.openMap();
    this._infoApi = this._facade.info;

    const date = this._facade.date$.getValue() as Date;

    this.selectForm = this._formBuilder.group({selectCtrl: [null, Validators.required]});
    this.dateTimeForm = new FormGroup({dateTimeCtrl: new FormControl(date, Validators.required)});
  }

  ngOnDestroy(): void {
    this._facade.closeMap();
  }

  onConfirmStepper(): void {
    this._facade.confirmStepper();
  }

  onChangeSelect($event: Event): void {
    this.selectForm.controls.selectCtrl
      .valueChanges.subscribe((value) => {
      this._facade.updateGroup(value);
    });
  }
}
