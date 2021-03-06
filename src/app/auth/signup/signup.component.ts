import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { CustomValidator     } from '../equals-validator.directive';
import { User                } from '../../classes/user';
import { AuthService         } from '../auth.service';
import { ErrorStateMatcher   } from '@angular/material/core';
import { DetectMobileService } from '../../services/detect-mobile/detect-mobile.service';
import { Router              } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { IconsUserDialogComponent } from './icons-user-dialog/icons-user-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  matcher =   new MyErrorStateMatcher();
  avatar:     string;
  constructor(
    private fb:           FormBuilder,
    private authService:  AuthService,
    private _mobile:      DetectMobileService,
    private _router:      Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.createForm();
    window.addEventListener('resize', this.isMobile);
    // setTimeout(() => this.openDialog(), 100);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.isMobile);
  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(
  //     IconsUserDialogComponent, { disableClose: true }
  //   );

  //   dialogRef.afterClosed().subscribe(avatar => this.avatar = avatar);
  // }


  createForm() {
    this.signupForm = this.fb.group(
      {
        'firstName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        'lastName':  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        'email':     ['', [Validators.required, Validators.email]],
        'password':  ['',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
          ]
        ],
        'password2': ['',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
          ]
        ],
      }
    );

    this.signupForm.get('password2').setValidators(
      CustomValidator.equals(this.signupForm.get('password'))
    );


  }

  isMobile = () => {
    return this._mobile.isMobile();
  }

  goToHome = () => {
    this._router.navigateByUrl('/');
  }

  onSubmit() {


    if (!this.signupForm.valid) {
      this.authService.showError('Los datos ingresados no son validos. Verifica y vuelve a intentarlo.', 3000);
    }

    if (this.signupForm.valid) {

      const { firstName, lastName, email, password, password2} = this.signupForm.value;
      const user = new User(email, password, password2, firstName, lastName, null);

      this.authService.signup(user)
        .subscribe(
          this.authService.login,
          this.authService.handleError
        );
    }
  }
}
