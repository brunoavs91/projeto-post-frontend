import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PostService } from 'src/app/services/post.service';
import { PostDTO } from 'src/app/models/post.dto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  post = {} as PostDTO;
  imagemConvertida : string;

  constructor(public storage: StorageService, public postService : PostService,
     public usuarioService : UsuarioService, public routes :Router) { }

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
  this.convertToString(this.fileData);
}

 
onSubmit() {
  const formData = new FormData();
  this.post.email= this.usuarioService.getEmail();
  formData.append('file', this.fileData);
  formData.append('post', JSON.stringify(this.post))
  this.postService.postImage(formData)
    .subscribe(response => {
      console.log(response);
      alert('POSTADO COM SUCESSO');
      this.routes.navigateByUrl('galeria');
    },error =>{}) 
  }


sendPost(){
this.post.imagem = this.convertToString(this.fileData);
  console.log(this.post)
  this.postService.sendPost(this.post)
    .subscribe(response => {
      console.log(response);
      this.uploadedFilePath = null;
      alert('SUCCESS !!');
    },error =>{})
}


  convertToString(file : File) : any{
  let reader = new FileReader();
  let resultado =null;
  reader.readAsBinaryString(file);
  reader.onload = function () {
    console.log(reader.result);
    return reader.result;
  }
   
  }
  
}
