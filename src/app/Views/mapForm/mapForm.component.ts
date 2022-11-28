import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getApi } from 'src/app/Services/getApi.service';

@Component({
  selector: 'app-mapForm',
  templateUrl: './mapForm.component.html',
  styleUrls: ['./mapForm.component.css']
}) 
export class MapFormComponent implements OnInit{

  //  Le composant ActivatedRoute permettra de récupérer les numéros de stations
  //  Le service getApi sera utilisé pour envoyer des valeures aux headers et footers
  constructor(private route: ActivatedRoute, private bicycle: getApi){}

  // event et MessageTab permettront de récupérer les valeures à envoyer via le service getApi
  event = new Object();
  messageTab = new Array();
  pipe = new DatePipe('en-US');  

  // Ces deux variables today permettent de tester la suppression des réservations antérieures à la date du jour
  today: Date = new Date('10/15/2022');
//  today: Date = new Date();

  // Ce tableau est une "coquille vide" à la construction d'objets javascripts
  localStorageTab = new Array();

  ngOnInit(): void {
    this.messageTab = [this.event];
    Object.assign(this.event, {utilisateur: 'Utilisateur'});
    this.displayService('Remplissez les infos');

    // cf function InsertData pour explication du début du fonctionnement
    // On récupère les données du localStorage afin de les injecter dans le tableau et ensuite le manipuler
    this.localStorageTab = JSON.parse(localStorage.getItem('JSON') || 'null');

    console.log(this.localStorageTab);

    // On supprime les réservations antérieures à la date du jour 
    this.PastDateDelete(this.today);

    // On supprime le localStorage afin de pouvoir le recréer par la suite via le tableau
    localStorage.clear();
  }

  InsertData(data: {NgName: string, NgLastName: string, NgEmail: string, NgCheckbox: boolean, NgDate: object}){ 
    // Ajout du numéro de station à l'objet data
    this.route.params.subscribe(params => { Object.assign(data, {StationNumber: params['id']})})

    // Construction des objets Javascript
    if(this.localStorageTab == null){ this.localStorageTab = [data]; }
    else { this.localStorageTab.push(data); }

    // Transmission du nom de l'utilisateur au service.
    Object.assign(this.event, {utilisateur: this.localStorageTab[this.localStorageTab.length - 1]['NgName']});
    this.bicycle.emitMessage(this.messageTab[0]);

    // Contrôles des input et checkbox
    if(this.localStorageTab[this.localStorageTab.length - 1]['NgName'] == "" ||
        this.localStorageTab[this.localStorageTab.length - 1]['NgLastName'] == "" ||
        this.localStorageTab[this.localStorageTab.length - 1]['NgEmail'] == "")
      { this.alerteDisplayServiceDeleteTab('Input Missing!', 'Réservation non prise en compte', this.localStorageTab)  } 
    else if(this.localStorageTab[this.localStorageTab.length - 1]['NgCheckbox'] == false)
      { this.alerteDisplayServiceDeleteTab('CheckBox Missing!', 'Réservation non prise en compte', this.localStorageTab)  }
    else if(this.localStorageTab[this.localStorageTab.length - 1]['NgDate'] == "")
      { this.alerteDisplayServiceDeleteTab('Date Missing!', 'Réservation non prise en compte', this.localStorageTab)  }
    else {
      // Contrôle de saisi de dates antérieures à la date du jour : 
      // Le format de NgDate est aligné au format de today pour qu'ils soient comparés
      this.localStorageTab[this.localStorageTab.length - 1]['NgDate'] = new Date(this.localStorageTab[this.localStorageTab.length - 1]['NgDate']);

      if(this.localStorageTab[this.localStorageTab.length - 1]['NgDate'] < this.today){
        { this.alerteDisplayServiceDeleteTab('Date antérieure à aujourd\'hui!', 'Réservation non prise en compte', this.localStorageTab)  }} 
      else{
        // Les dates n'apparaîtront pas comme identiques si elles sont sous forme "object"
        // Les dates sont donc transformées en string pour pouvoir être comparées entre elles
        for (let a = 0; a < this.localStorageTab.length; a++) 
        { this.localStorageTab[a]['NgDate'] = this.pipe.transform(this.localStorageTab[a]['NgDate'], 'M/d/yy');}

      // Vérification si un vélo est déjà réservé 
        if(this.localStorageTab.length > 1){
          let constCount = 0;
          for(const i in this.localStorageTab[0]){ constCount++; }  
          for (let a = 0; a < this.localStorageTab.length - 1; a++) {
            let equalCount = 0;  
            for(const key in this.localStorageTab[0]){
              if(this.localStorageTab[a][key] == this.localStorageTab[this.localStorageTab.length - 1][key]){ equalCount++; }}    
            // Si le nombre de valeurs égales est identique au nombre de propriétés, cela signifie 
            // que la réservation a déjà été effectuée
            if(equalCount == constCount){
              alert('Vous avez déjà réservé un vélo dans cette station pour cette date');
              let input = confirm('Voulez-vous quand même en réserver un?');
              if(input == true){ this.alertDisplayService('Réservation validée', 'Réservation validée')} 
              else { this.alerteDisplayServiceDeleteTab('Réservation annulée', 'Réservation annulée', this.localStorageTab)  }
              break;} 
            else { this.displayService('Réservation validée')}}} 
        else{ this.displayService('Réservation validée')}
        this.setLocalStorage();
      }
    }
  }

  alerteDisplayServiceDeleteTab(message1: string, message2: string, tab: any){
    this.alertDisplayService(message1, message2);
    tab.splice(tab.length - 1, 1);
  }

  alertDisplayService(message1: string, message2: string){ 
    alert(message1) 
    this.displayService(message2)
  } 

  displayService(myMessage: string){
    Object.assign(this.event, {message: myMessage});
    this.bicycle.emitMessage(this.messageTab[0]);
  }

  goMap(){
    this.setLocalStorage();
    Object.assign(this.event, {utilisateur: 'Utilisateur'});
    this.displayService('Choisissez une station');
  }

  setLocalStorage(){
        // localStorage permet de stocker les données du localStorageTableau dans le navigateur sans utiliser de serveur backend
        // Le localStorageTableau étant structuré comme un objet Javascript, on peut utiliser JSON.stringify afin de le stocker
        localStorage.setItem("JSON", JSON.stringify(this.localStorageTab));
  }

  PastDateDelete(today: Date){
    // Les dates doivent être au format Date pour être comparées
    if(this.localStorageTab != null){
      for (let a = 0; a < this.localStorageTab.length; a++) {
        this.localStorageTab[a]['NgDate'] = new Date(this.localStorageTab[a]['NgDate']);
      }
      for (let a = 0; a < this.localStorageTab.length; a++) {
        if(today > this.localStorageTab[a]['NgDate']){
          this.localStorageTab.splice(a, 1);
          a = 0;
        } 
      }
    }
  }
}









