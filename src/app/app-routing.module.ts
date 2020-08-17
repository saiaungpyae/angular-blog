import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'posts/new', component: NewPostComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: NewPostComponent },
  { path: 'posts/:id/edit', component: NewPostComponent, data: { method: 'edit'}, canActivate: [AuthGuard] },
  { path: 'posts/:id/delete', component: NewPostComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
