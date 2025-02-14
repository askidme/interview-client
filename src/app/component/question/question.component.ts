import {Component, OnInit} from '@angular/core';
import {InterviewQuestionResponse} from '../../model/interview-quesition-response.model';
import {TopicConfidenceLevels} from '../../model/topic-confidence-level.model';
import {ActivatedRoute, Router} from '@angular/router';
import {InterviewQuestionService} from '../../service/interview/interview-question.service';
import {InterviewQuestionsRequest} from '../../model/interview-question-request.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';
import {InterviewQuestion} from '../../model/interview-question.model';

@Component({
  selector: 'app-question',
  imports: [CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
  standalone: true
})
export class QuestionComponent implements OnInit {
  questionResponse: InterviewQuestionResponse | null = null;
  showAnswer = false;
  currentQuestion = 1;
  totalQuestions = 0;
  questionIds: number[] = [];
  userId :number;
  interviewQuestion: InterviewQuestion;

  topicConfidenceLevels: TopicConfidenceLevels[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private questionService: InterviewQuestionService,
              private authService: AuthService ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['questionIds']) {
        this.questionIds = JSON.parse(queryParams['questionIds']);
        console.log('Retrieved questionIds from queryParams:', this.questionIds);
        this.totalQuestions = this.questionIds.length
        // Use questionIds as needed (e.g., store in a property or fetch questions)
        this.fetchQuestion(); // Assuming fetchQuestion uses questionIds
      } else {
        console.error('Question IDs not found in query parameters.');
        // Handle the error (e.g., redirect to the interview prep page)
        this.router.navigate(['/interview-prep']);
      }
    });
    // const storedRequest = localStorage.getItem('interviewQuestionsRequest');
    // if (storedRequest) {
    //   this.interviewQuestionsRequest = JSON.parse(storedRequest);
    //   // console.log('Retrieved interviewQuestionsRequest from localStorage:', JSON.stringify(this.interviewQuestionsRequest));
    //   this.fetchQuestion();
    // } else {
    //   console.error('Interview questions request not found in localStorage.');
    //   // Handle the error (e.g., redirect to the interview prep page)
    //   this.router.navigate(['/topic']);
    // }
    // const navigation = this.router.getCurrentNavigation();
    // console.log(`navigation: ${JSON.stringify(navigation)}`);
    // if (navigation?.extras?.state) {
    //   this.interviewQuestionsRequest = navigation.extras.state['interviewQuestionsRequest'];
    //   console.log(`!!!interviewQuestionsRequest: ${JSON.stringify(this.interviewQuestionsRequest)}`);
    //   this.fetchQuestion();
    // }
    // this.userId = this.authService.getUser().id;
    // this.route.params.subscribe((params) => {
    //   this.currentQuestion = +params['questionNumber'] || 1;
    // });
    // // const navigation = this.router.getCurrentNavigation();
    // // console.log(`navigation: ${JSON.stringify(navigation)}`);
    // // if (navigation?.extras?.state) {
    // //   this.interviewQuestionsRequest = navigation.extras.state['interviewQuestionsRequest'];
    // //   console.log(`!!!interviewQuestionsRequest: ${JSON.stringify(this.interviewQuestionsRequest)}`);
    // // }
    //
    // this.route.queryParams.subscribe((queryParams) => {
    //   console.log(`queryParams1: ${JSON.stringify(queryParams)}`);
    //   this.topicConfidenceLevels = this.extractTopicsFromQueryParams(queryParams);
    //   this.fetchQuestion();
    // });
  }

  fetchQuestion(): void {
    this.questionService.getQuestion(this.questionIds[this.currentQuestion - 1]).subscribe(
        (response) => {
          this.interviewQuestion = response;
        },
        (error) => {
          console.error('Error fetching question:', error);
        }

    )
  }

  toggleAnswer(): void {
    this.showAnswer = !this.showAnswer;
  }

  navigateToQuestion(questionNumber: number): void {
    // Validate the question number
    if (questionNumber < 1 || questionNumber > this.totalQuestions) {
      console.error('Invalid question number');
      return;
    }
    this.currentQuestion = questionNumber;
    this.fetchQuestion();
    const queryParams = {
      questionIds: JSON.stringify(this.questionIds),
    };
    this.showAnswer = false;
    this.router.navigate(['/question', questionNumber],{queryParams});
  }

  finishInterview(): void {
    this.router.navigate(['/summary']); // Redirect to summary page
  }

  extractTopicsFromQueryParams(queryParams: any): TopicConfidenceLevels[] {
    const topics: TopicConfidenceLevels[] = [];
    Object.keys(queryParams).forEach((key) => {
      if (key.startsWith('topicConfidenceLevelsList')) {
        const match = key.match(/topicConfidenceLevelsList\[(\d+)\].topicId/);
        if (match) {
          const index = parseInt(match[1], 10);
          topics[index] = topics[index] || { topicId: 0, confidenceLevels: null };
          topics[index].topicId = +queryParams[key];
        }

        const confidenceMatch = key.match(/topicConfidenceLevelsList\[(\d+)\].confidenceLevels\[(\d+)\]/);
        if (confidenceMatch) {
          const topicIndex = parseInt(confidenceMatch[1], 10);
          topics[topicIndex] = topics[topicIndex] || { topicId: 0, confidenceLevels: null };
          topics[topicIndex].confidenceLevels.push(queryParams[key]);
        }
      }
    });
    return topics;
  }
}
