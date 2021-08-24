import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service1Service} from "../../../services/service1.service";
import {Service2Service} from "../../../services/service2.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public service1: Service1Service,
    public service2: Service2Service
  ) {
  }

  form = this.formbuilder.group(
    {
      email: [
        '',
        Validators.compose(
          [Validators.required, this.service1.check_valid_email]
        )
      ],
      password: [
        '',
        Validators.compose(
          [Validators.required, this.service1.check_valid_password]
        )
      ]
    }
  )

  get_form_control(): any {
    return this.form.controls
  }

  get_error_msg_for_email(): any {
    const email = this.get_form_control().email
    if (email.hasError('required')) {
      return 'email is req';
    }else if (email.hasError('not_valid_email')) {
      return 'email is not valid';
    }
  }

  get_error_msg_for_password(): any {
    const password = this.get_form_control().password
    if (password.hasError('required')) {
      return 'password is req';
    }else if (password.hasError('not_valid_password')) {
      return 'password must be atleast 8 characters long and must have uppercase, lowercase, digits and special character in it';
    }
  }

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.form)

    if (this.form.valid) {
      this.service2.openSnackBar('login success')
    }

  }

}
