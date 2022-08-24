import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  public userName:string;
  public userSubs:Subscription;
  constructor(
    private store:Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user').pipe(filter(({user}) => user != null)).subscribe(({user}) =>{
      this.userName = user.user;
    });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

}
