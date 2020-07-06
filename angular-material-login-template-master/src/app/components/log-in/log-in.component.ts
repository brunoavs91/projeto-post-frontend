import { Component, OnInit } from '@angular/core';
import { CredenciaisDTO } from 'src/app/models/credenciais.dto';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {


  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public auth :AuthService, public router :Router ) { }

  ngOnInit() {
  }

  
  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response =>{
      this.auth.successFullLogin(response.headers.get('Authorization'));

      console.log("chegou" + response)
      this.router.navigateByUrl('galeria');
     // this.navCtrl.navigateRoot('categorias');

    },
    erro =>{});
    //vai empilhar a pagina em cima da outra
    
  }

}
