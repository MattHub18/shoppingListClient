import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";

export class RegisterPageForm {
    constructor(private formBuilder: FormBuilder) { }

    createForm(): FormGroup {
      let form = this.formBuilder.group({
            username: ['', [Validators.required]],
            password1: ['', [Validators.required]],
            password2: ['', [Validators.required]]
        });

      form.get('password2').setValidators(this.passwordMatchValidator(form));

      return form;
    }

    private passwordMatchValidator(form: FormGroup):ValidatorFn {
        const password1 = form.get('password1').value;
        const password2 = form.get('password2').value;
      return () => {
          return password1 === password2 ? null : {isNotMatching: true};
        };
    }
}
