import { Injectable } from '@angular/core';
import { Post } from "./post.model";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts : Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http : HttpClient) { }

  getPosts() {
    this.http.get<{meassge : string, posts: Post[]}>('http://localhost:4000/api/posts')
    .subscribe((postData)=> {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts])
      console.log("{}{}{}{}{}",this.posts)
    })
  }

  getPostUpdatedListner(){
    return this.postsUpdated.asObservable();
  }

  addPost(title : string, content : string){
    const post = { id :null,title : title , content : content}
    this.http.post<{message : string}>("http://localhost:4000/api/posts", post)
    .subscribe(responseData => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts])
    })
  }
}
