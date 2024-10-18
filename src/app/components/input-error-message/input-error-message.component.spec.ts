import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputErrorMessageComponent } from './input-error-message.component';
import {FormControl, FormGroup} from "@angular/forms";

describe('InputErrorMessageComponent', () => {
  let component: InputErrorMessageComponent;
  let fixture: ComponentFixture<InputErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputErrorMessageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(InputErrorMessageComponent);
    component = fixture.componentInstance;
    component.field = new FormGroup({email: new FormControl(), password: new FormControl()});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should show error 'required' on username input touched`, () => {
    component.field.markAsTouched();
    component.field.setErrors({required: true});
    component.error = 'required';
    expect(component.displayErrorMessage()).toBeTruthy();
  });

  it(`should show error 'required' on password input touched`, () => {
    component.field.markAsTouched();
    component.field.setErrors({required: true});
    component.error = 'required';
    expect(component.displayErrorMessage()).toBeTruthy();
  });

  it(`should not show error 'qwerty' because not existed`, () => {
    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = 'qwerty';
    expect(component.displayErrorMessage()).toBeFalsy();
  });

  it(`should not show error 'qwerty' because not set`, () => {
    component.field.markAsTouched();
    component.error = 'qwerty';
    expect(component.displayErrorMessage()).toBeFalsy();
  });
});
