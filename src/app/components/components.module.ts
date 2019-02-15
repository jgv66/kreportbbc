import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CollapsibleComponent } from './collapsible/collapsible.component';

@NgModule({
  declarations: [ CollapsibleComponent ],
  imports: [ CommonModule, IonicModule ],
  exports: [ CollapsibleComponent ]
})
export class ComponentsModule { }
