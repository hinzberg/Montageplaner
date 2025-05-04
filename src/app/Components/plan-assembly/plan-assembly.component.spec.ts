import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAssemblyComponent } from './plan-assembly.component';

describe('PlanAssemblyComponent', () => {
  let component: PlanAssemblyComponent;
  let fixture: ComponentFixture<PlanAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanAssemblyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
