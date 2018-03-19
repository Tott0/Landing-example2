import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormErrorMessageComponent } from './components/form-errors/form-errors.component';

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

/* Material Components */
import {
  MatInputModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
  MatSelectModule, MatGridListModule, MatIconModule, MatCardModule, MatListModule, MatPaginatorModule,
  MatTabsModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule,
  MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatRadioModule, MatChipsModule, MatAutocompleteModule,
  MatMenuModule, MatTableModule, MatSortModule
} from '@angular/material';

import { MatPaginatorIntl } from '@angular/material';
import { CustomMatPaginatorIntl } from '../core/providers/custom-mat-paginator-intl';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    MatInputModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
    MatSelectModule, MatGridListModule, MatIconModule, MatCardModule, MatListModule, MatPaginatorModule,
    MatTabsModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatRadioModule, MatChipsModule,
    MatAutocompleteModule, MatMenuModule, MatTableModule, MatSortModule,
  ],
  declarations: [
    FormErrorMessageComponent,
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
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    //
    MatInputModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
    MatSelectModule, MatGridListModule, MatIconModule, MatCardModule, MatListModule, MatPaginatorModule,
    MatTabsModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatRadioModule, MatChipsModule,
    MatAutocompleteModule, MatMenuModule, MatTableModule, MatSortModule,
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
  ],
  entryComponents: [
    LoadingDialog,
    MessageDialog,
    WarehouseFiltersDialog,
    ResultSnackbar,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
  ]
})
export class SharedModule { }
