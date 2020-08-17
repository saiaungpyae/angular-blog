import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Post } from '../post';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup
  isEdit: boolean = false;
  postId: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public apiService: ApiService,
    public authService: AuthService
  ) {
    this.newPostForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      tags: new FormControl(),
    });
  }

  async ngOnInit(): Promise<any> {
    if(this.route.snapshot.data['method'] === 'edit') {
      const postId = this.route.snapshot.paramMap.get('id');
      const data: Post = await this.apiService.getSinglePost(postId);
      this.newPostForm.patchValue({
        title: data.title,
        description: data.description,
        tags: data.tags
      });
      this.isEdit = true;
      this.postId = postId;
    }
  }

  async submitPost(): Promise<any> {
    const { title, description, tags } = this.newPostForm.value;
    console.log('qwerqwer', tags);
    const useId = JSON.parse(this.authService.getUserData())._id;
    const body: Post = {
      title, description, tags: (tags || []).map(t => t.value || t), author: useId
    };

    if(this.isEdit) {
      await this.apiService
        .updatePost(body, this.postId)
        .catch(err => console.log(err));
    } else {
      await this.apiService
        .createPost(body)
        .catch(err => console.log(err));
    }
    this.router.navigate(['/home']);
  }
}
