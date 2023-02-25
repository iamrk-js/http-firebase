import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ipost } from './shared/model/post';
import { PostsService } from './shared/services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'http-firebase';
  postArray: Ipost[] = [];
  postForm!: FormGroup;
  isUpdateting: any;
  constructor(private postService: PostsService) {

  }

  ngOnInit(): void {
    this.createPostForm();
    this.postService.getAllPosts()
      .subscribe(res => {
        console.log(res)
        this.postArray = res;
      })
      this.postService.getStudentData()
        .subscribe(res => console.log(res))
  }
  createPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    })
  }
  onPostSubmit() {
    console.log(this.postForm.value)
    this.postService.addPost(this.postForm.value)
      .subscribe(res => console.log(res))
  }

  onPostUpdate() {
    let updateId = localStorage.getItem("updateId")
    this.postService.updatePost(this.postForm.value, updateId)
      .subscribe(res => console.log(res))
  }

  onPostDelete(id: number) {
    this.postService.removePost(id)
      .subscribe(res => console.log(res))
  }
  onPostEdit(obj: Ipost) {
    if ('id' in obj) {
      localStorage.setItem("updateId", ""+obj.id)
    }
    this.postForm.patchValue({
      title: obj.title,
      content: obj.content
    })
    this.isUpdateting = true
  }
}
