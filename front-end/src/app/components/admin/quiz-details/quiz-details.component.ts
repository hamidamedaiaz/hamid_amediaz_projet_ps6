import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../../../models/quiz.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.scss'
})
export class QuizDetailsComponent implements OnInit {
  form: FormControl = new FormControl('');

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialisation du formulaire

  }

  @Input() quiz!:Quiz;
}
