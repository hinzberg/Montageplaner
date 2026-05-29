import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBarComponent),
      multi: true
    }
  ]
})

export class SearchBarComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder = 'Search';
  @Input() debounce = 300;             // ms
  @Input() minLength = 0;              // ignore shorter terms
  @Input() clearable = true;

  @Output() search = new EventEmitter<string>(); // emits debounced search terms

  control = new FormControl('');
  private sub: Subscription | null = null;
  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.sub = this.control.valueChanges.pipe(
      startWith(this.control.value),
      debounceTime(this.debounce),
      distinctUntilChanged()
    ).subscribe(value => {
      const term = (value || '').trim();
      if (term.length >= this.minLength || term === '') {
        this.search.emit(term);
      }
      // propagate to outer form if used as a form control
      this.onChange(value);
    });
  }

  // ControlValueAccessor
  writeValue(obj: any): void {
    this.control.setValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { isDisabled ? this.control.disable({emitEvent:false}) : this.control.enable({emitEvent:false}); }

  clear() {
    this.control.setValue('');
    // immediate emit after clearing (bypass debounce if you want immediate)
    this.search.emit('');
    this.onChange('');
  }

  touch() {
    this.onTouched();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
