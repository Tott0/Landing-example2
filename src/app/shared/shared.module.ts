import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormErrorMessageComponent } from './components/form-errors/form-errors.component';

import { CaseRejectDialog } from './dialogs/case-reject/case-reject.dialog';
import { CaseSuccessDialog } from './dialogs/case-success/case-success.dialog';
import { LoadingDialog } from './dialogs/loading/loading.dialog';
import { PicoYPlacaDialog } from './dialogs/pico-y-placa/pico-y-placa.dialog';
import { RatingDialog } from './dialogs/rating/rating.dialog';
import { MessageDialog } from './dialogs/message/message.dialog';

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
import { MultaCodePipe } from './pipes/code-multa';
import { EnumPersonTypePipe } from './pipes/enum-person-type';
import { EnumCarTypePipe } from './pipes/enum-car-type';
import { EnumCaseStatePipe } from './pipes/enum-case-state';

/* Material Components */
import {
  MatInputModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
  MatSelectModule, MatGridListModule, MatIconModule, MatCardModule, MatListModule, MatPaginatorModule,
  MatTabsModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule,
  MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatRadioModule, MatChipsModule, MatAutocompleteModule
} from '@angular/material';

import { MatPaginatorIntl } from '@angular/material';
import { CustomMatPaginatorIntl } from '../core/providers/custom-mat-paginator-intl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
    MatSelectModule, MatGridListModule, MatIconModule, MatCardModule, MatListModule, MatPaginatorModule,
    MatTabsModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatRadioModule, MatChipsModule, MatAutocompleteModule,
  ],
  declarations: [
    FormErrorMessageComponent,
    //
    CaseRejectDialog,
    CaseSuccessDialog,
    LoadingDialog,
    PicoYPlacaDialog,
    RatingDialog,
    MessageDialog,
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
    MultaCodePipe,
    EnumPersonTypePipe,
    EnumCarTypePipe,
    EnumCaseStatePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //
    MatInputModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
    MatSelectModule, MatGridListModule, MatIconModule, MatCardModule, MatListModule, MatPaginatorModule,
    MatTabsModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatRadioModule, MatChipsModule, MatAutocompleteModule,
    //
    FormErrorMessageComponent,
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
    MultaCodePipe,
    EnumPersonTypePipe,
    EnumCarTypePipe,
    EnumCaseStatePipe
  ],
  entryComponents: [
    CaseRejectDialog,
    CaseSuccessDialog,
    LoadingDialog,
    PicoYPlacaDialog,
    RatingDialog,
    MessageDialog,
    ResultSnackbar,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
  ]
})
export class SharedModule { }
