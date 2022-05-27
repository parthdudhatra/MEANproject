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
  private postsSub: Subscription = new Subscription;

  constructor(public postservice : PostService) { }

  ngOnInit(): void {
    this.postservice.getPosts();
    this.postsSub = this.postservice.getPostUpdatedListner().subscribe((posts : Post[])=> {
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
