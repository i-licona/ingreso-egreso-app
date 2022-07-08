import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup;
  public loadding:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) {
    this.loginForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, Validators.required]
    });
  }

  ngOnInit(): void {
  }
  login(){

    if (this.loginForm.invalid) return;

    Swal.fire({
      title: 'Espere un momento',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.loadding = true;
    this.authService.loginUsuario(this.loginForm.value).then(res => {
      Swal.close();
      this.loadding = false;
      this.router.navigate(['/']);
    }).catch( e => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sus credenciales no son correctas'
      });
      this.loadding = false;
    })
  }
}
