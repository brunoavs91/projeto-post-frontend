import { Injectable } from '@angular/core';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { LocalUser } from '../models/local_user';
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http : HttpClient, public storage: StorageService) { }

  authenticate(creds : CredenciaisDTO){
    return this.http.post(
         `${API_CONFIG.baseUrl}/login`,
         creds,
         {
             observe :'response',
             responseType : 'text'
         });
        }

    successFullLogin(authorizationValue : string){
          //tirando a palavrar Bearer do token
          let token = authorizationValue.substring(7);
          let user : LocalUser ={
              token : token,
              email : this.jwtHelper.decodeToken(token).sub
          }
          this.storage.setLocalUser(user);
      }
  
      logout(){
          this.storage.setLocalUser(null);
      }
}
