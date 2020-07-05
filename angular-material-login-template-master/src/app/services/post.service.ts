import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { PostDTO } from '../models/post.dto';
import { UsuarioDTO } from '../models/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient, public storage : StorageService) { }

  
  getToken(): string{
    return this.storage.getLocalUser().token;
  }

  postImage(image : FormData, post : PostDTO) : Observable<any> {
    let token = this.getToken();
    post.email= this.storage.getLocalUser().email;
    const httpOptions : Object = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' +  token,
        'Accept': 'application/json'
        
      })
    };
    return  this.http.post<any> (`${API_CONFIG.baseUrl}/posts/picture`,image, httpOptions);
  }


  sendPost(post : PostDTO) : Observable<PostDTO> {
    let token = this.getToken();
    const httpOptions : Object = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' +  token,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return  this.http.post<PostDTO> (`${API_CONFIG.baseUrl}/posts`,post, httpOptions);
  }

  findAll() : Observable<PostDTO[]> {
    let token = this.getToken();
 
    const httpOptions : Object = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' +  token,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
   
     return this.http.get<PostDTO[]>(`${API_CONFIG.baseUrl}/posts`,httpOptions);
        
    }   
}
