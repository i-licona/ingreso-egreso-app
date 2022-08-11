import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Usuario,FbUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription:Subscription;

  constructor(
    public auth:AngularFireAuth,
    private firestore:AngularFirestore,
    private store:Store<AppState>
    ) { }

  initAuthListener(){
    this.auth.authState.subscribe(user =>{
      if (user) {
        this.userSubscription = this.firestore.doc(`${user.uid}/user`).valueChanges().subscribe(fsUser =>{
          const user:FbUser = fsUser;
          this.store.dispatch(setUser({user:user}));
        });
      } else{
        this.userSubscription.unsubscribe();
        this.store.dispatch(unSetUser());
      }
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
