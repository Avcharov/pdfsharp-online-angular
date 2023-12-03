import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { components } from '.';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    TranslateModule.forChild({ extend: true }),
    SharedModule
  ],
  declarations: [...components],
  exports: [...components],
})
export class CoreModule { }
