import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export class ListPageForm {
    constructor(private formBuilder: FormBuilder) { }

    createForm(): FormGroup {
        return this.formBuilder.group({
            isle: ['', [Validators.required]],
            item: ['', [Validators.required]]
        });
    }
}
