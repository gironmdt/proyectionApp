import { NgModule } from "@angular/core";
import { ProyectionFormComponent } from "./proyection-form/proyection-form.component";
import { MaterialSharedModule } from "../../material-shared/material-shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PrimeSharedModule } from "../../prime-shared/prime-shared.module";
import { ProyectionContainerComponent } from './proyection-container/proyection-container.component';

// Use this module to add Material dependencies
@NgModule({
    declarations: [
        ProyectionFormComponent,
        ProyectionContainerComponent
    ],
    imports: [
        MaterialSharedModule,
        PrimeSharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        MaterialSharedModule,
        PrimeSharedModule,
        ProyectionFormComponent,
        HttpClientModule,
        ProyectionContainerComponent
    ],
    providers: [
    ],
})
export class ProyectionModule { }
