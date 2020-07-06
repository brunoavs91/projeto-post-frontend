import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioDTO } from '../models/usuario.dto';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient, public storage : StorageService) { }

  getToken(): string{
    return this.storage.getLocalUser().token;
  }

  getEmail() : string{
    return this.storage.getLocalUser().email;
  }

  

  findByEmail(email : string) : Observable<UsuarioDTO>{
    let token = this.getToken();
    
    const httpOptions : Object = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' +  token,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    
   
   return this.http.get<UsuarioDTO>(
       `${API_CONFIG.baseUrl}/clientes/email?value=${email}`, httpOptions);
       
    
}
  saveUsuario(usuario : UsuarioDTO) :  Observable<void>{
    let token = this.getToken();

    const httpOptions : Object = {
      headers: new HttpHeaders({
       
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return  this.http.post<any> (`${API_CONFIG.baseUrl}/usuarios`,usuario, httpOptions);
  }

}
