import {TopicConfidenceLevels} from './topic-confidence-level.model';

export interface InterviewQuestionsRequest {
  userId: number;
  topicConfidenceLevelsList: TopicConfidenceLevels[];
}
