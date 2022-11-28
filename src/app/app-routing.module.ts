import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './Views/map/map.component';
import { MapFormComponent } from './Views/mapForm/mapForm.component';

const routes: Routes = [
  // ":id" de la route MapFormComponent permettra de récupérer les numéros de stations 
  { path: "mapForm/:id", component: MapFormComponent},
  // L'initialisation de l'application se fait sur l'affichage de la carte
  { path: "", component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


