import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component'

export const routes: Routes = [
  { path: '', redirectTo: 'mysql', pathMatch: 'full' },
  { path: 'mysql', loadChildren: 'app/mysql/mysql.module#MySQLModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
