import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth) { }

  initAuthListener(){
    this.auth.authState.subscribe(user =>{
      console.log(user?.email);
      console.log(user?.uid);
    });
  }

  crearUsuario(user:string, email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUsuario(user:Usuario){
    const { email, password} = user;
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    return this.auth.signOut();
  }
}
