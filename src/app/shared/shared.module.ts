import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingDialog } from './dialogs/loading/loading.dialog';
import { MessageDialog } from './dialogs/message/message.dialog';

import { ResultSnackbar } from './dialogs/result-snackbar/result.snackbar';

import { ForceUppercaseDirective } from './directives/force-uppercase.directive';
import { ForceNumericDirective } from './directives/force-numeric.directive';
import { ForceAlphabeticDirective } from './directives/force-alphabetic.directive';
import { ForceValueDirective } from './directives/force-value.directive';
import { ForceTimeValueDirective } from './directives/force-time-value.directive';

import { TruncatePipe } from './pipes/truncate';
import { TimePipe } from './pipes/time';
import { DatePipe } from './pipes/date';
import { Date2Pipe } from './pipes/date2';
import { FullDatePipe } from './pipes/full-date';
import { CopCurrencyPipe } from './pipes/cop-currency';
import { DecimalPipe } from './pipes/decimal';
import { EnumPositionTypePipe } from './pipes/enum-position-type';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';

/*Libraries */
import { BarRatingModule } from 'ngx-bar-rating';
import { AgmCoreModule } from '@agm/core';
import { Ng5SliderModule } from 'ng5-slider';


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
    ResultSnackbar,
    //
    ForceUppercaseDirective,
    ForceNumericDirective,
    ForceAlphabeticDirective,
    ForceValueDirective,
    ForceTimeValueDirective,
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
    ForceTimeValueDirective,
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
    BarRatingModule,
    AgmCoreModule,
    Ng5SliderModule,
  ],
  entryComponents: [
    LoadingDialog,
    MessageDialog,
    ResultSnackbar,
  ]
})
export class SharedModule { }
