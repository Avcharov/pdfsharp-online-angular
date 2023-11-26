import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { components } from '.';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...components],
  exports: [...components],
})
export class CoreModule {}
