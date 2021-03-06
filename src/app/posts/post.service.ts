import { Injectable } from '@angular/core';
import { Post } from "./post.model";
import { Subject , map} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts : Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http : HttpClient, private router : Router) { }

  getPosts() {
    this.http.get<{meassge : string, posts: any[]}>('http://localhost:4000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map((post)=>{
        return {
          title : post.title,
          content : post.content,
          id : post._id
        }
      })
    }))
    .subscribe(tranformedPost=> {
      this.posts = tranformedPost;
      this.postsUpdated.next([...this.posts])
    })
  }

  getPostUpdatedListner(){
    return this.postsUpdated.asObservable();
  }

  getPost(id : string){
    return this.http.get<{ _id : string , title : string , content : string}>
    ("http://localhost:4000/api/posts/" + id);
  }


  updatePost(id : string , title : string, content : string){
    const post : Post = { id : id, title : title, content : content}
    this.http.put("http://localhost:4000/api/posts/" + id, post)
    .subscribe(
      response => {console.log(response),
      this.router.navigate(["/"])
  })
  }

  addPost(title : string, content : string){
    const post = { id :'',title : title , content : content}
    this.http.post<{message : string, postId: string}>("http://localhost:4000/api/posts", post)
    .subscribe(responseData => {
      // console.log(responseData.message);
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"])
    })
  }

  deletePost(postId: any){
    this.http.delete("http://localhost:4000/api/posts/" + postId)
    .subscribe(() =>{
      const updatedPost = this.posts.filter(post => post.id !== postId)
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts])
    })
  }
}
