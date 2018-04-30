import { Injectable, InjectionToken, ComponentRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { PdfViewerOverlayComponent } from './pdf-viewer-overlay.component';

import { OverlayRef } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { PdfViewerOverlayRef } from './pdf-viewer-overlay.ref';
import { DocumentFile } from '../../models/shared.model';
import { PDF_VIEWER_DIALOG_DATA } from './pdf-viewer-overlay.ref.1';

interface PdfViewerDialogConfig {
  panelClass?: string;
  backdropClass?: string;
  data?: DocumentFile;
}

const DEFAULT_CONFIG: PdfViewerDialogConfig = {
  backdropClass: 'dark-backdrop',
  panelClass: 'pdf-viewer-dialog-panel'
};



@Injectable()
export class PdfViewerOverlayService {

  // Inject overlay service
  constructor(
    private injector: Injector,
    private overlay: Overlay,
    private location: Location) { }

  open(config: PdfViewerDialogConfig = {}) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new PdfViewerOverlayRef(overlayRef);

    const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

    overlayRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
    this.location.subscribe(event => {
      console.log(event);
      dialogRef.close();
    });

    return dialogRef;
  }

  private getOverlayConfig(config: PdfViewerDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: PdfViewerDialogConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private createInjector(config: PdfViewerDialogConfig, dialogRef: PdfViewerOverlayRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(PdfViewerOverlayRef, dialogRef);
    injectionTokens.set(PDF_VIEWER_DIALOG_DATA, config.data);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

  private attachDialogContainer(overlayRef: OverlayRef, config: PdfViewerDialogConfig, dialogRef: PdfViewerOverlayRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(PdfViewerOverlayComponent, null, injector);
    const containerRef: ComponentRef<PdfViewerOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }
}
