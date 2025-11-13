import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePipesComponent } from './sample-pipes.component';

describe('SamplePipesComponent', () => {
  let component: SamplePipesComponent;
  let fixture: ComponentFixture<SamplePipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplePipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SamplePipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
