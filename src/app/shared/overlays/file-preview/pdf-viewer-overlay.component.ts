import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { PdfViewerOverlayRef } from './pdf-viewer-overlay.ref';
import { PDF_VIEWER_DIALOG_DATA } from './pdf-viewer-overlay.ref.1';
import { PDFSource, PDFProgressData } from 'ng2-pdf-viewer';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '@core/providers/auth.service';

const ESC_KEYCODE = 27;

@Component({
  selector: 'app-pdf-viewer-overlay',
  templateUrl: './pdf-viewer-overlay.component.html',
  styleUrls: ['./pdf-viewer-overlay.component.scss']
})
export class PdfViewerOverlayComponent implements OnInit {

  pdfSrc: PDFSource;
  loading = true;

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESC_KEYCODE) {
      this.dialogRef.close();
    }
  }

  constructor(
    public dialogRef: PdfViewerOverlayRef,
    private authService: AuthService,
    @Inject(PDF_VIEWER_DIALOG_DATA) public document: any
  ) {
    this.pdfSrc = {
      url: document.url,
      httpHeaders: { token: authService.token }
    };
  }

  ngOnInit() {
  }

  onLoad(ev) {
    console.log(ev);
    this.loading = false;
  }

  onError(ev) {
    console.log(ev);
    this.dialogRef.close();
  }

}
