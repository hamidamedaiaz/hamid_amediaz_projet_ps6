import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class StatsService {

  idAcceuilli$ = new BehaviorSubject<number | null>(null);
  idQuiz$ = new BehaviorSubject<number | null>(null);

  public selectAcceuilli(id:number){
    this.idAcceuilli$.next(id);
  }

  public selectQuiz(id:number){
    this.idQuiz$.next(id);
  }

}
