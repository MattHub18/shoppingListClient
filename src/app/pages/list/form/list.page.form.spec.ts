import {FormBuilder, FormGroup} from "@angular/forms";
import {ListPageForm} from "./list.page.form";

describe('ListPageForm', () => {

  let form: FormGroup;

  beforeEach(() => {
    form = new ListPageForm(new FormBuilder()).createForm();
  });

  it('should create', () => {
    expect(form).toBeTruthy();
  });

  it('should create empty form', () => {
    expect(form.get('isle').value).toEqual('');
    expect(form.get('item').value).toEqual('');

    expect(form.valid).toBeFalsy();
    expect(form.get('isle').valid).toBeFalsy();
    expect(form.get('item').valid).toBeFalsy();
  });

  it('should be valid', () => {
    form.get('isle').setValue(3);
    form.get('item').setValue('password');

    expect(form.valid).toBeTruthy();
    expect(form.get('isle').valid).toBeTruthy();
    expect(form.get('item').valid).toBeTruthy();
  });
});
