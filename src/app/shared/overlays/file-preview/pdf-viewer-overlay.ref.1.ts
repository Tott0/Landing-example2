import { InjectionToken } from '@angular/core';

import { DocumentFile } from '../../models/shared.model';

export const PDF_VIEWER_DIALOG_DATA = new InjectionToken<DocumentFile>('PDF_VIEWER_DIALOG_DATA');
