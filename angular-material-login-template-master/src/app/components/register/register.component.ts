import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/models/usuario.dto';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['ADMIN', 'CLIENTE'];

  usuario = {} as UsuarioDTO;

  selectedRole : string;

  constructor(public storage: StorageService, public usuarioService : UsuarioService) { }

  ngOnInit() {
  }


  salvarUsuario(){
    this.usuario.role= this.selectedRole; 
    let localUser = this.storage.getLocalUser();
    if(localUser){
         this.usuarioService.saveUsuario(this.usuario).subscribe(response =>{
          console.log('USUARIO SALVO');
          this.usuario = null;
      },
      erro =>{this.usuario=null})
    }
    
  }
}