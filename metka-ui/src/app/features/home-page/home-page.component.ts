import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacadeService } from '../../core/services/facade.service';
import { Observable, Subscription } from 'rxjs';
import { InfoApi } from '../../core/model/info-api';

@Component({
  selector: 'app-hometag',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  readonly info$!: Observable<InfoApi>;
  isLinear = false;
  selectForm!: FormGroup;
  dateTimeForm!: FormGroup;
  private subSelectCtrl!: Subscription;
  private subDateTimeCtrl!: Subscription;

  constructor(
    private _facade: FacadeService,
    private _formBuilder: FormBuilder,
  ) {
    this.info$ = this._facade.info$;
  }

  ngOnInit(): void {
    // const infoDate = this._facade.info?.initialMarker.infoDate;//TODO find out whether DateFromApi is needed or not

    // FormGroups for step 1 & step 2
    this.selectForm = this._formBuilder.group(
      {selectCtrl: [null, Validators.required]});
    this.dateTimeForm = new FormGroup(
      {dateTimeCtrl: new FormControl(new Date(), Validators.required)});

    // Subscribe on dateTimePicker
    this.subDateTimeCtrl = this.dateTimeForm.controls.dateTimeCtrl
      .valueChanges.subscribe((date: Date) => {
        this._facade.updateDate(date);
      });
    // Subscribe on selectionChange
    this.subSelectCtrl = this.selectForm.controls.selectCtrl
      .valueChanges.subscribe((id: number) => {
        this._facade.updateGroup(id);
      });
  }

  ngOnDestroy(): void {
    this._facade.unbindInfoApi();
    this.subSelectCtrl.unsubscribe();
  }

  onConfirmStepper(): void {
    this._facade.confirmStepper();
  }

  resetDateTimeCtrl(): void {//TODO assert validators
    this.dateTimeForm.reset({'dateTimeCtrl': new Date()});
  }
}
