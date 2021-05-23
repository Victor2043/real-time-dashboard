import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphicsComponent } from './graphics/graphics.component';

const routes: Routes = [ 
  
  { path: 'home', component: GraphicsComponent},
  
  { path: '**', redirectTo: 'home'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
