import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';

import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

import { Post } from '../post';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup
  moment: any = moment;
  posts$: Observable<Post[]>
  refrehPosts$ = new BehaviorSubject(true);
  postId: String;
  eventsSubject: Subject<any> = new Subject<any>();

  constructor(public authService: AuthService, public apiService: ApiService) {
    this.searchForm = new FormGroup({
      query: new FormControl()
    })
  }

  ngOnInit(): void {
    this.posts$ = this.refrehPosts$.pipe(switchMap(_ => this.apiService.getPosts()));
  }

  emitEventToChild(postId) {
    this.eventsSubject.next({postId});
  }

  refresh(): void {
    this.refrehPosts$.next(true);
  }

  searchPosts(query?: string): void {
    const q = query || this.searchForm.value.query;
    if (q) {
      this.posts$ = this.apiService.getPosts(q);
    }
  };

  logout(): void {
    this.authService.logout();
  }

}
