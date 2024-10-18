import { Component, Input } from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-input-error-message',
  templateUrl: './input-error-message.component.html',
  styleUrls: ['./input-error-message.component.scss'],
})
export class InputErrorMessageComponent {
  /**
   * Component params:
   * message: error message shown
   * field: which input has invalid value
   * error: error type of input, see Validators' form
   **/
  @Input() message:string;
  @Input() field: AbstractControl;
  @Input() error:string;

  constructor() { }

  /** show error **/
  displayErrorMessage(): boolean{
    return this.field.touched && this.field.hasError(this.error);
  }

}
