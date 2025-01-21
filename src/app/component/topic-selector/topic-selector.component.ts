import {Component, OnInit} from '@angular/core';
import {Topic} from '../../model/topic.model';
import {TopicService} from '../../service/topic/topic.service';
import {Router} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-topic-selector',
  imports: [CommonModule,
    MatFormFieldModule,
    MatSelectModule],
  templateUrl: './topic-selector.component.html',
  styleUrl: './topic-selector.component.css',
  standalone: true
})
export class TopicSelectorComponent implements OnInit {

  topics: Topic[] = [];
  selectedTopicId: number | null = null;

  constructor(private topicService: TopicService, private router: Router) {
  }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe(topics => {
      this.topics = topics;
    })
  }

  onSelectTopic(): void {
    if(this.selectedTopicId !== null) {
      this.router.navigate(['questions', this.selectedTopicId]);
    }
  }
}
