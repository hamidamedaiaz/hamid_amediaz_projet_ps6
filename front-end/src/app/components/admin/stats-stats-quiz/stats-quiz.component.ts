import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';
import { QuizListService } from 'src/services/quiz-list.service';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-stats-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats-quiz.component.html',
  styleUrl: './stats-quiz.component.scss'
})
export class StatsQuizComponent implements OnInit {


  profiles: Profile[] = [];
  quizzes: Quiz[] = [];



  selectedQuiz: Quiz | null = null;



  readonly ITEMS_PER_PAGE = 5;
  currentPage = 1;




  searchQuery = '';
  sortBy = 'title';




  private readonly months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  constructor(
    private profileService: ProfileService,
    private quizService: QuizListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileService.profiles$.subscribe(profiles => {
      this.profiles = profiles;
      console.log('Profils chargés:', this.profiles.length);
    });


    this.quizService.quizzes$.subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }

  viewQuizDetails(quiz: Quiz) {
    console.log('Navigation vers les statistiques détaillées du quiz:', quiz.title);
    this.router.navigate(['/quiz-stats', quiz.id]);
  }

  closeQuizDetails() {
    this.selectedQuiz = null;
  }



  filteredQuizzes() {
    let filtered = [...this.quizzes];



    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(query)
      );
    }



    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'count':
          return this.getQuizCount(b) - this.getQuizCount(a);
        case 'score':
          return this.getAverageScore(b) - this.getAverageScore(a);
        default:
          return 0;
      }
    });

    const startIndex = (this.currentPage - 1) * this.ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + this.ITEMS_PER_PAGE);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  getTotalPages(): number {
    let filteredQuizzes = [...this.quizzes];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filteredQuizzes = filteredQuizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(query)
      );
    }

    return Math.ceil(filteredQuizzes.length / this.ITEMS_PER_PAGE);
  }

  getQuestionCount(quiz: Quiz): number {
    return Math.floor(Math.random() * 20) + 1;
  }

  getQuizCount(quiz: Quiz): number {
    return Math.floor(Math.random() * 20) + 1;
  }

  getAverageScore(quiz: Quiz): number {
    return Math.floor(Math.random() * 20) + 60;
  }

  getLastPlayedDate(quiz: Quiz): string {

    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  }
}
