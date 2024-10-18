import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "./login.page.form";

describe('LoginPageForm', () => {

  let form: FormGroup;

  beforeEach(() => {
    form = new LoginPageForm(new FormBuilder()).createForm();
  });

  it('should create', () => {
    expect(form).toBeTruthy();
  });

  it('should create empty form', () => {
    expect(form.get('username').value).toEqual('');
    expect(form.get('password').value).toEqual('');

    expect(form.valid).toBeFalsy();
    expect(form.get('username').valid).toBeFalsy();
    expect(form.get('password').valid).toBeFalsy();
  });

  it('should be valid', () => {
    form.get('username').setValue('username');
    form.get('password').setValue('password');

    expect(form.valid).toBeTruthy();
    expect(form.get('username').valid).toBeTruthy();
    expect(form.get('password').valid).toBeTruthy();
  });
});
