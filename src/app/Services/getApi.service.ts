import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Bicycle } from '../Interfaces/Bicycle';
import { Observable } from 'rxjs';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class getApi implements OnInit {
  constructor(private http: HttpClient) {}

  private emitChangeSource = new Subject<any>();
  changeEmitted = this.emitChangeSource.asObservable();

  newService: Observable<Bicycle[]> | null = null;

  ngOnInit(): void {

  }

  emitMessage(change: any) {
    this.emitChangeSource.next(change);
  }

  getAPI(){
    this.newService = this.http.get<Bicycle[]>('https://api.jcdecaux.com/vls/v3/stations?apiKey=614b1673950457cfac83a7cef49b556fa4a52220');
    return this.newService;
  }



}



