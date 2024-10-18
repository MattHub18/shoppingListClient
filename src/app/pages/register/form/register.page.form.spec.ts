import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterPageForm} from "./register.page.form";

describe('RegisterPageForm', () => {

  let form: FormGroup;

  beforeEach(() => {
    form = new RegisterPageForm(new FormBuilder()).createForm();
  });

  it('should create', () => {
    expect(form).toBeTruthy();
  });

  it('should create empty form', () => {
    expect(form.get('username').value).toEqual('');
    expect(form.get('password1').value).toEqual('');
    expect(form.get('password2').value).toEqual('');

    expect(form.valid).toBeFalsy();
    expect(form.get('username').valid).toBeFalsy();
    expect(form.get('password1').valid).toBeFalsy();
    expect(form.get('password2').valid).toBeFalsy();
  });

  it('should be valid', () => {
    form.get('username').setValue('username');
    form.get('password1').setValue('password1');
    form.get('password2').setValue('password2');

    expect(form.valid).toBeTruthy();
    expect(form.get('username').valid).toBeTruthy();
    expect(form.get('password1').valid).toBeTruthy();
    expect(form.get('password2').valid).toBeTruthy();
  });
});
