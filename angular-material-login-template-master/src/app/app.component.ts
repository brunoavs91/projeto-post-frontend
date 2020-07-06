import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projeto-Post';

  constructor(public storage: StorageService, public router : Router){}
  

 disabledGaleria : boolean = this.storage.getLocalUser != null;
 
 
}
