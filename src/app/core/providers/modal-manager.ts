import { Injectable, Component, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { LoadingDialog } from '../../shared/dialogs/loading/loading.dialog';
import { MessageDialog } from '../../shared/dialogs/message/message.dialog';
import { WarehouseFiltersDialog } from '../../shared/dialogs/warehouse-filters/warehouse-filters.dialog';
//
import { ResultSnackbar } from '../../shared/dialogs/result-snackbar/result.snackbar';

enum ModalTags {
  LOADING,
  MESSAGE,
  WAREHOUSE_FILTERS
}

@Injectable()
export class ModalManager {

  currentModal: MatDialogRef<any>;
  currentModalTag: ModalTags;

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  public createModal(tag: number, component: any, config?: MatDialogConfig): Observable<any> {
    if (tag === this.currentModalTag) {
      return;
    }

    this.closeCurrentModal();

    this.currentModalTag = tag;
    this.currentModal = this.dialog.open(component, config);
    return this.setCallback();
  }

  setCallback(): Observable<any> {
    const onClose = () => {
      this.currentModal = undefined;
      this.currentModalTag = undefined;
    };

    if (this.currentModal) {
      this.currentModal.beforeClose()
        .subscribe(() => {
          onClose();
        });
      return this.currentModal.afterClosed()
        .do(() => {
        });
    }
    return Observable.of<any>(undefined);
  }

  closeCurrentModal(): boolean {
    if (this.currentModal) {
      this.currentModal.close();
      return true;
    } else {
      return false;
    }
  }

  closeModalTag(tag) {
    if (tag === this.currentModalTag) {
      this.closeCurrentModal();
    }
  }

  showLoadingDialog() {
    this.createModal(ModalTags.LOADING, LoadingDialog, {
      panelClass: ['dialog', 'dialog-loading'],
      disableClose: true,
      hasBackdrop: true
    });
  }
  closeLoadingDialog() {
    if (this.currentModalTag === ModalTags.LOADING) {
      this.closeCurrentModal();
    }
  }

  showMessageDialog(config?: MatDialogConfig): Observable<any> {
    if (!config) {
      config = {};
    }
    config.panelClass = ['dialog', 'dialog-rating'];
    return this.createModal(ModalTags.MESSAGE, MessageDialog, config);
  }

  showWarehouseFiltersDialog(config?: MatDialogConfig): Observable<any> {
    if (!config) {
      config = {};
    }
    config.panelClass = ['dialog', 'dialog-warehouse-filters'];
    return this.createModal(ModalTags.WAREHOUSE_FILTERS, WarehouseFiltersDialog, config);
  }

  /* snackbars */
  showResultSnackbar(message, goodResult = true) {
    this.snackbar.openFromComponent(ResultSnackbar, {
      data: {
        goodResult: goodResult,
        message: message,
      },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'result-snackbar'
    });
  }
}
