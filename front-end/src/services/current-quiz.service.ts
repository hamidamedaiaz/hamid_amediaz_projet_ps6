import { Injectable } from "@angular/core";
import { Question } from "src/models/question.model";
import { Quiz } from "src/models/quiz.model";

@Injectable({
    providedIn: 'root'
})

export class CurrentQuizService {

    public currentQuiz: Quiz | null = null;

    private score: number = 0;

    constructor() { }

    public setCurrentQuiz(quiz: Quiz) {
        this.currentQuiz = quiz;
        console.log("current quiz: ", this.currentQuiz);
    }

    public setScore(value:number){
        this.score = value;
    }

    public getScore():number{
        return this.score;
    }

    public getQuestions():Question[]|null{
        if(this.currentQuiz){
            return this.currentQuiz.questions;
        }
        return null;
    }

    public getNumberOfQuestions(){
        if(this.currentQuiz){
            return this.currentQuiz.questions.length;
        }
        return null;   
    }
}