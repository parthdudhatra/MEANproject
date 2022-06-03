import { Component, OnInit , Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
    title : any;
    content : any;

  posts : Post[] = [];
  isLoading = false;
  private postsSub: Subscription = new Subscription;

  constructor(public postservice : PostService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postservice.getPosts();
    this.postsSub = this.postservice.getPostUpdatedListner().subscribe((posts : Post[])=> {
      this.isLoading = false;
      this.posts = posts;
    })
  }

  onDelete(postId : string){
    this.postservice.deletePost(postId)
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
