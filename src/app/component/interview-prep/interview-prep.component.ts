import {Component, OnInit} from '@angular/core';
import {TechnologyService} from '../../service/technology/technology.service';
import {TopicService} from '../../service/topic/topic.service';
import {Technology} from '../../model/technology.model';
import {Topic} from '../../model/topic.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {InterviewQuestionsRequest} from '../../model/interview-question-request.model';
import {AuthService} from '../../service/auth/auth.service';
import {TopicConfidenceLevels} from '../../model/topic-confidence-level.model';
import {InterviewQuestionService} from '../../service/interview/interview-question.service';
import {InterviewQuestionResponse} from '../../model/interview-quesition-response.model';

@Component({
  selector: 'app-interview-prep',
  imports: [CommonModule, FormsModule],
  templateUrl: './interview-prep.component.html',
  styleUrl: './interview-prep.component.css',
  standalone: true
})
export class InterviewPrepComponent implements OnInit {
  technologies: Technology[] = [];
  topics: Topic[] = [];
  selectedTechnologyId: number | null = null;
  selectedTopicId: number | null = null;
  selectedTopics: any[] = [];

  constructor(private technologyService: TechnologyService,
              private topicService: TopicService,
              private router: Router,
              private authService: AuthService,
              private questionService: InterviewQuestionService,) {
  }

  ngOnInit(): void {
    this.loadTechnologies();
  }

  loadTechnologies(): void {
    this.technologyService.getTechnologies().subscribe((data) => {
      this.technologies = data;
    });
  }

  onTechnologyChange(): void {
    if (this.selectedTechnologyId) {
      this.topicService.getTopicsByTechnology(this.selectedTechnologyId).subscribe((data) => {

        this.topics = data;
      });
    } else {
      this.topics = [];
    }
  }

  addTopic(): void {

    if (!this.selectedTopicId) return;
    const topic = this.topics.find((t) => t.topicId === Number(this.selectedTopicId));
    if (!topic) return;

    if (!this.selectedTopics.some((t) => t.id === topic.topicId)) {
      this.selectedTopics.push({
        id: topic.topicId,
        name: topic.title,
        confidenceLevels: {
          UNFAMILIAR: false,
          LOW: false,
          MEDIUM: false,
          ENOUGH: false,
          HIGH: false,
          ALL: true,
        },
      });
    }
  }

  toggleAllConfidence(topic: any): void {
    const allChecked = topic.confidenceLevels.ALL;
    Object.keys(topic.confidenceLevels).forEach((key) => {
      if (key !== 'ALL') topic.confidenceLevels[key] = allChecked;
    });
  }

  deleteTopic(topicId: number): void {
    this.selectedTopics = this.selectedTopics.filter((t) => t.id !== topicId);
  }

  startInterview(): void {

    // Construct query parameters for topicConfidenceLevels
    const queryParams: any = {};
    let topicConfidenceLevels: TopicConfidenceLevels[] = [];
    this.selectedTopics.forEach((topic, index) => {
      topicConfidenceLevels.push({topicId: topic.id, confidenceLevels: null});
      // queryParams[`topicConfidenceLevelsList[${index}].topicId`] = topic.id;
      // queryParams[`topicConfidenceLevelsList[${index}].confidenceLevels`] = null;
      // console.log(`confidenceLevels: ${JSON.stringify(topic.confidenceLevels)}`);

      // topic.confidenceLevels.forEach((level: string, levelIndex: number) => {
      //   queryParams[`topicConfidenceLevelsList[${index}].confidenceLevels[${levelIndex}]`] = level;
      // });
    });
    let interviewQuestionsRequest: InterviewQuestionsRequest = {
      userId: this.authService.getUser().id,
      topicConfidenceLevelsList: topicConfidenceLevels
    };

    // console.log(`queryParams: ${JSON.stringify(queryParams)}`);
    this.questionService.getQuestionIds(interviewQuestionsRequest).subscribe(
      (response: InterviewQuestionResponse) => {
        console.log(`response: ${JSON.stringify(response)}`);
        const queryParams = {
          questionIds: JSON.stringify(response.questionIds), // Serialize the array
        };
        console.log(`queryParams: ${JSON.stringify(queryParams)}`);
        // Navigate to QuestionComponent with questionNumber 1 and query parameters
        this.router.navigate(['/question', 1], { queryParams });
      },
      (error) => {
        console.error('Error fetching question:', error);
      }
    );
  }
}
