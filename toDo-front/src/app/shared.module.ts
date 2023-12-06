import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    CardComponent,
    TaskComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardComponent
  ]
})
export class SharedModule { }