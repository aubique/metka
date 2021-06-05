import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Marker } from '../../core/model/marker';
import { Observable } from 'rxjs';
import { FacadeService } from '../../core/services/facade.service';
import { tap } from 'rxjs/operators';
import { DtoMarker } from '../../core/model/dto-marker';
import { InfoApi } from '../../core/model/info-api';
import { MatSelectChange } from '@angular/material/select';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id', 'lat', 'lng', 'mrkdate'];
  dataSource = new MatTableDataSource<DtoMarker>();
  private _markerList: Observable<Array<DtoMarker>>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  info$: Observable<InfoApi>;

  constructor(
    private _facade: FacadeService,
  ) {
    this._markerList = this._facade.markerList$;
    this.info$ = this._facade.info$;
  }

  ngOnInit(): void {
    // this._facade.bindMarkerList(0);
  }

  ngAfterViewInit(): void {
    this._markerList
      .pipe(
        tap((list) => {
          list.forEach(m => console.log(m.mrkdate));
        }),
      ).subscribe((dtoMarkers) => {
      this.dataSource.data = dtoMarkers;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this._facade.unbindMarkerList();
  }

  onRowClick(rowAsMarker: Marker): void {
    this._facade.updateSelectedMarker(rowAsMarker);
  }

  onGroupChange($event: MatRadioChange): void {
    const groupId = $event.value as number;
    this._facade.bindMarkerList(groupId);
  }
}
