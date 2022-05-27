import { style } from "@angular/animations";
import { Component , Output, EventEmitter, NgModule } from "@angular/core";
import { Post } from '../post.model'
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";

@Component({
  selector : 'app-post-component',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css'],
})
export class PostCreateComponent{

  constructor(public postservice : PostService) {}
  eteredTitle = '';
  eteredContent = '';
  // @Output() postCreated = new EventEmitter()
  onAddPost(form : NgForm){
    console.log("<<<<<<<<<<>>>>>>>>>>", form)
    if(form.invalid){
      return;
    }
    // const post : Post = {
    //   title : form.value.title ,
    //   content : form.value.content}
    // this.postCreated.emit(post)
    this.postservice.addPost(form.value.title, form.value.content)
    form.reset();
  }
}
