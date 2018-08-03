
import { OverlayRef } from '@angular/cdk/overlay';

export class PdfViewerOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
