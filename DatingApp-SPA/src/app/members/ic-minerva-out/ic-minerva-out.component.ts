import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';

// such override allows to keep some initial values
export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true,  max: 150 });
}


@Component({
  selector: 'app-ic-minerva-out',
  templateUrl: './ic-minerva-out.component.html',
  styleUrls: ['./ic-minerva-out.component.css'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class IcMinervaOutComponent implements OnInit {

  @ViewChild('dv') editForm: DataView;

  batchCreditSearches: BatchCreditSearch[];

  selectedBatchCreditSearch: BatchCreditSearch;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  constructor() { }

  ngOnInit() {
    this.batchCreditSearches = [
      { batchId: '1', reference: 'a', createdDate: 2010, startDate: 2010, completedDate: 2013,
      totalAmountOfItems: 100, amountProcessed: 80, percentageComplete: 80},
      { batchId: '2', reference: 'b', createdDate: 2011, startDate: 2011, completedDate: 2012,
      totalAmountOfItems: 50, amountProcessed: 25, percentageComplete: 50},
      { batchId: '3', reference: 'c', createdDate: 2012, startDate: 2012,  completedDate: 2013,
      totalAmountOfItems: 10, amountProcessed: 1, percentageComplete: 10},
      { batchId: '1', reference: 'd', createdDate: 2010, startDate: 2010,  completedDate: 2014,
      totalAmountOfItems: 100, amountProcessed: 80, percentageComplete: 80},
      { batchId: '2', reference: 'e', createdDate: 2011, startDate: 2011, completedDate: 2015,
       totalAmountOfItems: 50, amountProcessed: 25, percentageComplete: 50},
      { batchId: '3', reference: 'f', createdDate: 2012, startDate: 2012, completedDate: 2016,
       totalAmountOfItems: 10, amountProcessed: 1, percentageComplete: 10},
      { batchId: '1', reference: 'g', createdDate: 2010, startDate: 2010, completedDate: 2017,
       totalAmountOfItems: 100, amountProcessed: 80, percentageComplete: 80},
      { batchId: '2', reference: 'h', createdDate: 2011, startDate: 2011, completedDate: 2015,
       totalAmountOfItems: 50, amountProcessed: 25, percentageComplete: 50},
      { batchId: '3', reference: 'i', createdDate: 2012, startDate: 2012, completedDate: 2016,
       totalAmountOfItems: 10, amountProcessed: 1, percentageComplete: 10},
    ];

    this.sortOptions = [
          {label: 'Newest First', value: '!year'},
          {label: 'Oldest First', value: 'year'},
      ];
  }

  selectBatch(event: Event, batchCreditSearch: BatchCreditSearch) {
      this.selectedBatchCreditSearch = batchCreditSearch;
      this.displayDialog = true;
      event.preventDefault();
  }

  onSortChange(event) {

      const value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  onDialogHide() {
      this.selectedBatchCreditSearch = null;
  }
}

export interface BatchCreditSearch {
  batchId;
  reference;
  createdDate;
  startDate;
  completedDate;
  totalAmountOfItems;
  amountProcessed;
  percentageComplete;
}

export interface SelectItem {
  label;
  value;
}
