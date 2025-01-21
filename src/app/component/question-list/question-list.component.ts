import {Component, OnInit} from '@angular/core';
import {InterviewQuestion} from '../../model/interview-question.model';
import {InterviewQuestionService} from '../../service/interview/interview-question.service';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {UserQuestion} from '../../model/user-question.model';
import {FormsModule} from '@angular/forms';
import {UserQuestionService} from '../../service/user/user-question.service';

@Component({
  selector: 'app-question-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule ],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
  standalone: true
})
export class QuestionListComponent implements OnInit {
  question: InterviewQuestion | null = null;
  showAnswer: boolean = false;
  topicId!: number;
  currentPage: number = 0;
  confidenceLevel: 'UNFAMILIAR' | 'LOW' | 'MEDIUM' | 'ENOUGH' | 'HIGH' = 'UNFAMILIAR';

  constructor(private questionService: InterviewQuestionService,
              private userQuestionService: UserQuestionService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.topicId = this.route.snapshot.params['topicId'];
    this.loadQuestions(this.currentPage)
  }

  loadQuestions(pageNumber: number): void {
    this.questionService.getQuestionsByTopicId(this.topicId, pageNumber)
    .subscribe(questions => {
      if(questions.length > 0) {
        this.question = questions[0];
      } else {
        this.question = null;
      }
    },
      error => {
        console.error('Error loading question:', error);
        this.question = null;
      })
  }

  nextQuestion(): void {
    this.showAnswer = false;
    this.currentPage += 1;
    this.loadQuestions(this.currentPage);
  }

  toggleAnswer(): void {
    this.showAnswer = !this.showAnswer; // Toggle visibility
  }

  submitProgress(): void {
    const userQuestion: UserQuestion = {
      userId: 1, // Replace with actual user ID from authentication
      questionId: this.question?.id!!,
      correct: true, // Replace with actual correctness logic
      confidenceLevel: this.confidenceLevel
    };
    this.userQuestionService.saveOrUpdateUserQuestion(userQuestion).subscribe({
      next: (response) => {
        console.log('Progress saved:', response);
        // Logic to move to the next question
      },
      error: (err) => {
        console.error('Failed to save progress:', err);
      }
    });
  }
}
