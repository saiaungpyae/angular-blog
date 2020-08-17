import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '../environments/environment';

import { Post } from './post';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, public authService: AuthService) { }

  getPosts(query?: string): Observable<Post[]> {
    let url = `${environment.apiUrl}/posts`;
    if (query) url = `${url}?q=${query}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res.data || []
      }),
      catchError(err => throwError(err))
    )
  }

  getSinglePost(_id: string): Promise<Post> {
    const url = `${environment.apiUrl}/posts/${_id}`;
    return new Promise((resolve, reject) => {
      this.http
      .get<Post>(url)
      .toPromise()
      .then((res: any) => {
        res.data.tags = res.data.tags.map(d => d.title);
        resolve(res.data);
      }, err => {
        reject(err);
      });
    });
  }

  createPost(body: Post) {
    const url = `${environment.apiUrl}/posts/new`;
    const headers = { authorization: this.authService.getAccessToken() };
    return new Promise((resolve, reject) => {
      this.http
      .post<Post>(url, body, { headers })
      .toPromise()
      .then((res: any) => {
        resolve();
      }, err => {
        reject(err);
      });
    });
  }

  updatePost(body: Post, postId: string) {
    const url = `${environment.apiUrl}/posts/${postId}`;
    const headers = { authorization: this.authService.getAccessToken() };
    return new Promise((resolve, reject) => {
      this.http
      .put<Post>(url, body, { headers })
      .toPromise()
      .then((res: any) => {
        resolve();
      }, err => {
        reject(err);
      });
    });
  }

  deletePost(_id: String) {
    const url = `${environment.apiUrl}/posts/${_id}`;
    const headers = { authorization: this.authService.getAccessToken() };
    return new Promise((resolve, reject) => {
      this.http
      .delete(url, { headers })
      .toPromise()
      .then((res: any) => {
        resolve();
      }, err => {
        reject(err);
      });
    });
  }
}
