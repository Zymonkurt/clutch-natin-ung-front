import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontComponent } from './front.component';

@NgModule({
  declarations: [FrontComponent],
  imports: [CommonModule],
  exports: [FrontComponent]
})
export class FrontModule { }