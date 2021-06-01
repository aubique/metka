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

  constructor(
    private _facade: FacadeService,
    private _formBuilder: FormBuilder,
  ) {
    this.info$ = this._facade.info$;
  }

  ngOnInit(): void {
    // Initialize the subscriptions to do GET reqs
    this._facade.openMap();

    // const date = this._facade.info?.initialMarker.date;//TODO find out whether DateFromApi is needed or not
    const date = new Date();

    // FormGroups for step 1 & step 2
    this.selectForm = this._formBuilder.group({selectCtrl: [null, Validators.required]});
    this.dateTimeForm = new FormGroup({dateTimeCtrl: new FormControl(date, Validators.required)});

    // Subscribe on selectionChange
    this.subSelectCtrl = this.selectForm.controls.selectCtrl
      .valueChanges.subscribe((id: number) => {
        this._facade.updateGroup(id);
      });
  }

  ngOnDestroy(): void {
    this._facade.closeMap();
    this.subSelectCtrl.unsubscribe();
  }

  onConfirmStepper(): void {
    this._facade.confirmStepper();
  }
}
