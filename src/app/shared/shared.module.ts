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
import { DecimalPipe } from './pipes/decimal';
import { EnumPositionTypePipe } from './pipes/enum-position-type';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';

import { UICarouselModule } from '@shared/components/UiCarousel/ui-carousel.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsedMaterialComponentsModule
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
    DecimalPipe,
    EnumPositionTypePipe,
    //
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    DecimalPipe,
    EnumPositionTypePipe,
    //
    UICarouselModule
  ],
  entryComponents: [
    LoadingDialog,
    MessageDialog,
    WarehouseFiltersDialog,
    ResultSnackbar,
  ]
})
export class SharedModule { }
