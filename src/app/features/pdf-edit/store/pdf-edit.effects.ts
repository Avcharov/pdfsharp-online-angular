import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';


@Injectable()
export class PdfEditEffects {
    constructor(private action$: Actions) { }

}