import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { Answer } from 'src/models/answer.model';
import { Profile } from 'src/models/profile.model';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class MultiPlayerQuizService {

  private readonly GIVEN_ANSWERS_KEY = 'current_score';

  private givenAnswersAnswer:Answer[] = [];

  private players:Profile[] = [];

  private PLAYERS_KEY:string = "PLAYERS";

  constructor(private localStorageService:LocalStorageService, private quizService:QuizService) { 
    this.loadFromStorage();
  }

  private loadFromStorage():void{
    const players = this.localStorageService.getItem(this.PLAYERS_KEY);
    const givenAnswersAnswer = this.localStorageService.getItem(this.GIVEN_ANSWERS_KEY);
    if(players) this.players = players;
    if(givenAnswersAnswer) this.givenAnswersAnswer = givenAnswersAnswer;
  }

  public getNumberOfGivenAnswers():number{
    return this.givenAnswersAnswer.length;
  }

  public joinGame(profile:Profile){
    this.players.push(profile);
    this.localStorageService.removeItem(this.PLAYERS_KEY)
    this.localStorageService.storeItem(this.PLAYERS_KEY, JSON.stringify(this.players));
  }

  public addGivenAnswer(answer:Answer){
    this.givenAnswersAnswer.push(answer);
    this.localStorageService.removeItem(this.GIVEN_ANSWERS_KEY);
    this.localStorageService.storeItem(this.GIVEN_ANSWERS_KEY, JSON.stringify(this.givenAnswersAnswer));
  }

  public getNumberOfPlayers():number{
    return this.players.length;
  }

  public getAnswersWithStats(questionId:number){
  
  }
}
