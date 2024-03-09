import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ChatPresentComponent } from './views/chat-present/chat-present.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'chat-org',component:ChatPresentComponent}
];
