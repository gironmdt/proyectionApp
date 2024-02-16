import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectionContainerComponent } from './proyection-container.component';

describe('ProyectionContainerComponent', () => {
  let component: ProyectionContainerComponent;
  let fixture: ComponentFixture<ProyectionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProyectionContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProyectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
