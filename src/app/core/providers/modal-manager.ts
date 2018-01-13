import { Injectable, Component, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { CaseRejectDialog } from '../../shared/dialogs/case-reject/case-reject.dialog';
import { CaseSuccessDialog } from '../../shared/dialogs/case-success/case-success.dialog';
import { LoadingDialog } from '../../shared/dialogs/loading/loading.dialog';
import { PicoYPlacaDialog } from '../../shared/dialogs/pico-y-placa/pico-y-placa.dialog';
import { RatingDialog } from '../../shared/dialogs/rating/rating.dialog';
import { MessageDialog } from '../../shared/dialogs/message/message.dialog';

enum ModalTags {
  LOADING,
  CASE_REJECT,
  PICOYPLACA,
  CASE_SUCCESS,
  RATING,
  MESSAGE
}

@Injectable()
export class ModalManager {

  currentModal: MatDialogRef<any>;
  currentModalTag: ModalTags;

  constructor(
    private dialog: MatDialog
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

  showCaseRejectDialog(config?: MatDialogConfig): Observable<any> {
    if (!config) {
      config = {};
    }
    config.panelClass = ['dialog', 'dialog-case-reject'];
    return this.createModal(ModalTags.CASE_REJECT, CaseRejectDialog, config);
  }

  showPPDialog(config?: MatDialogConfig): Observable<any> {
    if (!config) {
      config = {};
    }
    config.panelClass = ['dialog', 'dialog-pico-y-placa'];
    return this.createModal(ModalTags.PICOYPLACA, PicoYPlacaDialog, config);
  }

  showCaseSuccessDialog(config?: MatDialogConfig): Observable<any> {
    if (!config) {
      config = {};
    }
    config.panelClass = ['dialog', 'dialog-case-success'];
    return this.createModal(ModalTags.CASE_SUCCESS, CaseSuccessDialog, config);
  }

  showRatingDialog(config?: MatDialogConfig): Observable<any> {
    if (!config) {
      config = {};
    }
    config.panelClass = ['dialog', 'dialog-rating'];
    return this.createModal(ModalTags.RATING, RatingDialog, config);
  }

  showMessageDialog(config?: MatDialogConfig): Observable<any> {
    if (!config) {
      config = {};
    }
    config.panelClass = ['dialog', 'dialog-rating'];
    return this.createModal(ModalTags.MESSAGE, MessageDialog, config);
  }
}
