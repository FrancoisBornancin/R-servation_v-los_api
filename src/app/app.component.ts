import { Component, createPlatform, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { getApi } from './Services/getApi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
export class AppComponent implements OnInit{

  constructor(private service: getApi){}

  utilisateur = "Utilisateur";
  message = "Choisissez une station";

  ngOnInit(): void {

    // Récupérations des infos transmises par le mapFormComponent et initialisation des variables
    this.service.changeEmitted.subscribe(
      text => { 
        this.message = text['message'];
        this.utilisateur = text['utilisateur'];
      })
  }
}


