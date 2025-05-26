import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { Answer } from 'src/models/answer.model';
import { Profile } from 'src/models/profile.model';
import { QuizService } from './quiz.service';
import { PROFILE_LIST } from 'src/mocks/profile-list.mock';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from 'src/models/quiz.model';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class MultiPlayerQuizService {

  private readonly GIVEN_ANSWERS_KEY = 'current_score';

  private givenAnswersAnswer:Answer[] = [];

  private players:Profile[] = [];

  public players$:BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);

  private PLAYERS_KEY:string = "PLAYERS";

  private quiz:Quiz | null = null;

  constructor(private localStorageService:LocalStorageService, private quizService:QuizService,private profileService:ProfileService) {
    this.profileService.profiles$.subscribe((profiles) => {
      this.players = profiles
      this.players$.next(this.players)
    })
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

  public getNumberOfPlayers():number{ return this.players.length; }

  public getPlayers():Profile[]{ return this.players; }

  public removePlayer(player: Profile) {
    this.players = this.players.filter((p) => p !== player);
    this.players$.next(this.players);
  }

  public startQuiz(){
    if(this.quiz) this.quizService.setQuiz(this.quiz);
  }

  public selectQuiz(quiz:Quiz){
    this.quiz = quiz;
  }
}
