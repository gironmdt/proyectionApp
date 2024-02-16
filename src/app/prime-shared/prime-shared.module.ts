import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DockModule } from 'primeng/dock';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';

// Use this module to add Material dependencies
@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DockModule,
    MenubarModule,
    DialogModule
    
  ],
  exports: [
    CommonModule,
    TableModule,
    DockModule,
    MenubarModule,
    DialogModule
    
  ],
  providers: [
  ],
})
export class PrimeSharedModule {}
