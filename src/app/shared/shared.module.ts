import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingDialog } from './dialogs/loading/loading.dialog';
import { MessageDialog } from './dialogs/message/message.dialog';
import { WarehouseFiltersDialog } from './dialogs/warehouse-filters/warehouse-filters.dialog';

import { ResultSnackbar } from './dialogs/result-snackbar/result.snackbar';

import { ForceUppercaseDirective } from './directives/force-uppercase.directive';
import { ForceNumericDirective } from './directives/force-numeric.directive';
import { ForceAlphabeticDirective } from './directives/force-alphabetic.directive';
import { ForceValueDirective } from './directives/force-value.directive';

import { TruncatePipe } from './pipes/truncate';
import { TimePipe } from './pipes/time';
import { DatePipe } from './pipes/date';
import { Date2Pipe } from './pipes/date2';
import { FullDatePipe } from './pipes/full-date';
import { CopCurrencyPipe } from './pipes/cop-currency';
import { PlatePipe } from './pipes/plate';
import { DecimalPipe } from './pipes/decimal';
import { DurationPipe } from './pipes/duration';
import { EnumPositionTypePipe } from './pipes/enum-position-type';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    //
    LoadingDialog,
    MessageDialog,
    WarehouseFiltersDialog,
    ResultSnackbar,
    //
    ForceUppercaseDirective,
    ForceNumericDirective,
    ForceAlphabeticDirective,
    ForceValueDirective,
    //
    TruncatePipe,
    TimePipe,
    DatePipe,
    Date2Pipe,
    FullDatePipe,
    CopCurrencyPipe,
    PlatePipe,
    DecimalPipe,
    DurationPipe,
    EnumPositionTypePipe,
  ],
  exports: [
    CommonModule,
    //
    ForceUppercaseDirective,
    ForceNumericDirective,
    ForceAlphabeticDirective,
    ForceValueDirective,
    //
    TruncatePipe,
    TimePipe,
    DatePipe,
    Date2Pipe,
    FullDatePipe,
    CopCurrencyPipe,
    PlatePipe,
    DecimalPipe,
    DurationPipe,
    EnumPositionTypePipe,
  ],
  entryComponents: [
    LoadingDialog,
    MessageDialog,
    WarehouseFiltersDialog,
    ResultSnackbar,
  ]
})
export class SharedModule { }
