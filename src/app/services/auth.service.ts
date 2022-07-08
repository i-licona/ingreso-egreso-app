import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Usuario,FbUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth:AngularFireAuth,
    private firestore:AngularFirestore
    ) { }

  initAuthListener(){
    this.auth.authState.subscribe(user =>{
      console.log(user?.email);
      console.log(user?.uid);
    });
  }

  crearUsuario(name:string, email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      const newUser:FbUser = {
        id:user?.uid,
        email:email,
        user:name
      }
      return this.firestore.doc(`${user?.uid}/user`).set(newUser);
    });
  }

  loginUsuario(user:Usuario){
    const { email, password} = user;
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(map( user => user != null ));
  }
}
