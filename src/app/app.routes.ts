import { Routes } from '@angular/router';
import {QuestionListComponent} from './component/question-list/question-list.component';
import {TopicSelectorComponent} from './component/topic-selector/topic-selector.component';
import {UserRegistrationComponent} from './component/user-registration/user-registration.component';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {authGuard} from './guards/auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'topic', component: TopicSelectorComponent, canActivate: [authGuard] },
  { path: 'questions/:topicId', component: QuestionListComponent, canActivate: [authGuard]  },
  { path: 'login', component: LoginComponent}
];
