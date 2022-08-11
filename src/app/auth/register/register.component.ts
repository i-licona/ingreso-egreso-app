import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy{

  public registerForm: UntypedFormGroup;
  public loadding:boolean = false;
  private susbcription:Subscription;

  constructor(
    private formBuilder:UntypedFormBuilder,
    private authService:AuthService,
    private router:Router,
    private store:Store<AppState>
  ) {
    this.registerForm = this.formBuilder.group({
      user:[null, Validators.required],
      email:[null, [Validators.email, Validators.required]],
      password:[null, Validators.required]
    });
   }

  ngOnInit(): void {
    this.susbcription = this.store.select('ui').subscribe( ui => this.loadding = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.susbcription.unsubscribe();
  }

  createUser(){
    this.loadding = true;
    if (this.registerForm.invalid) return;

    /* Swal.fire({
      title: 'Espere un momento',
      didOpen: () => {
        Swal.showLoading()
      }
    }); */
    this.store.dispatch(isLoading());
    const { user, email, password } = this.registerForm.value;
    this.authService.crearUsuario(user, email, password).then(res => {
      /* Swal.close(); */
      this.store.dispatch(stopLoading());
      this.router.navigate(['/']);
    }).catch(e => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrio un error, intente nuevamente'
      });
      this.store.dispatch(stopLoading());
    });
  }
}
