
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UiService {
  private _closePopup$ = new Subject<void>();
  closePopup$ = this._closePopup$.asObservable();
  requestClosePopup() { this._closePopup$.next(); }

  private _labelClick$ = new Subject<string>();
  labelClick$ = this._labelClick$.asObservable();
  pick(text: string) { this._labelClick$.next(text); }
}
