import { style } from "@angular/animations";
import { Component , Output, EventEmitter, NgModule, OnInit } from "@angular/core";
import { Post } from '../post.model'
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector : 'app-post-component',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit{

  form!: FormGroup;
  constructor(public postservice : PostService, public route :ActivatedRoute ) {}
  eteredTitle = '';
  eteredContent = '';
  public mode = 'create';
  private postId!: any;
  isLoading = false
  post: any;
  // @Output() postCreated = new EventEmitter()

  ngOnInit() {
    this.form = new FormGroup({
      title : new FormControl(null, {
        validators : [Validators.required, Validators.minLength(3)]
      }),
      content : new FormControl(null , {
        validators : [Validators.required, Validators.maxLength(3)]
      })
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postservice.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
          this.form.setValue({
            title : this.post.title,
            content : this.post.content
          })
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onAddPost(){
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.postservice.addPost(this.form.value.title,this. form.value.content)
    }else {
      this.postservice.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content)
    }
    // const post : Post = {
    //   title : form.value.title ,
    //   content : form.value.content}
    // this.postCreated.emit(post)
    this.form.reset();
  }
}
