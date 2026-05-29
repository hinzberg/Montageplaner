import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChildComponent } from './list-child.component';

describe('ListChildComponent', () => {
  let component: ListChildComponent;
  let fixture: ComponentFixture<ListChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListChildComponent);
    component = fixture.componentInstance;
    // personIn is a required @Input; provide one before change detection.
    fixture.componentRef.setInput('personIn', { firstname: 'Test', name: 'Person' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
