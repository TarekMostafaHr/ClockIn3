import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClockComponent } from './clock/clock.component'; 
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LoginComponent2 } from './_login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';



const routes: Routes = [

  { path: 'clock', component: ClockComponent},
  { path: 'time-sheet', loadChildren:'app/time-sheet/time-sheet.module#TimeSheetModule'},  
  { path: 'login', component: LoginComponent2},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo:'/clock', pathMatch: 'full' },
  { path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
