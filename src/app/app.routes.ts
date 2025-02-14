import {Routes} from '@angular/router';
import {QuestionListComponent} from './component/question-list/question-list.component';
import {TopicSelectorComponent} from './component/topic-selector/topic-selector.component';
import {UserRegistrationComponent} from './component/user-registration/user-registration.component';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {authGuard} from './guards/auth.guard';
import {InterviewPrepComponent} from './component/interview-prep/interview-prep.component';
import {QuestionComponent} from './component/question/question.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: UserRegistrationComponent},
  {path: 'topic', component: InterviewPrepComponent, canActivate: [authGuard]},
  {path: 'questions/:topicId', component: QuestionListComponent, canActivate: [authGuard]},
  {path: 'question/:questionNumber', component: QuestionComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent}
];
