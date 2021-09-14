import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacadeService } from '../../core/services/facade.service';
import { Observable, Subscription } from 'rxjs';
import { InfoApi } from '../../core/model/info-api';
import { SnackBarMessage } from '../../shared/constants/snack-bar-message';

export enum ErrorVerbosity {
  DISABLED,
  ENABLED,
}

@Component({
  selector: 'app-hometag',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  readonly ERRORS = ErrorVerbosity;
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
    // this._facade.unbindInfoApi();
    this.subSelectCtrl.unsubscribe();
  }

  onConfirmStepper(): void {
    this._facade.confirmStepper();
  }

  resetDateTimeCtrl(): void {
    this.dateTimeForm.reset({'dateTimeCtrl': new Date()});
  }

  resetCoordinates(errorMode: ErrorVerbosity): void {
    if (this._facade.isGeoDenied && errorMode === this.ERRORS.ENABLED) {
      //alert('User denied Geolocation feature in the browser');
      this._facade.showMessageSnackBar(SnackBarMessage.GEOLOCATION_DENIED);
      return;
    }

    this._facade.updateGps();
  }
}
