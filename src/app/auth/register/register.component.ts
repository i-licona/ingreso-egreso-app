import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public loadding:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
  ) {
    this.registerForm = this.formBuilder.group({
      user:[null, Validators.required],
      email:[null, [Validators.email, Validators.required]],
      password:[null, Validators.required]
    });
   }

  ngOnInit(): void {
  }

  createUser(){
    this.loadding = true;
    if (this.registerForm.invalid) return;

    Swal.fire({
      title: 'Espere un momento',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const { user, email, password } = this.registerForm.value;
    this.authService.crearUsuario(user, email, password).then(res => {
      console.log(res);
      Swal.close();
      this.loadding = false;
      this.router.navigate(['/']);
    }).catch(e => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrio un error, intente nuevamente'
      });
      this.loadding = false;
    });
  }
}
