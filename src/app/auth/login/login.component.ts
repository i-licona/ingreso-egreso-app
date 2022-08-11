import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
/* rgrx */
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm:UntypedFormGroup;
  public loadding:boolean = false;
  public uiSubscription: Subscription;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService:AuthService,
    private router:Router,
    private store:Store<AppState>
  ) {
    this.loginForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, Validators.required]
    });
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(({isLoading}) => {
      this.loadding = isLoading;
    });
  }


  login(){

    if (this.loginForm.invalid) return;
    /* dispatch to change state */
    this.store.dispatch(isLoading());
  /*   Swal.fire({
      title: 'Espere un momento',
      didOpen: () => {
        Swal.showLoading()
      }
    }); */

    this.authService.loginUsuario(this.loginForm.value).then(res => {
      /* Swal.close(); */
      this.store.dispatch(stopLoading());
      this.router.navigate(['/']);
    }).catch( e => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sus credenciales no son correctas'
      });
    })
  }
}
