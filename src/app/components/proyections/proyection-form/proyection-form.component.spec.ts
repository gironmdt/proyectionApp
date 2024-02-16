import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectionFormComponent } from './proyection-form.component';

describe('ProyectionFormComponent', () => {
  let component: ProyectionFormComponent;
  let fixture: ComponentFixture<ProyectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProyectionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProyectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
