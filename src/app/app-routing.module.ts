import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () =>
	import('./account/account.module').then((x) => x.AccountModule);
const quizzesModule = () =>
	import('./quizzes/quizzes.module').then((x) => x.QuizzesModule);

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'quizzes', loadChildren: quizzesModule, canActivate: [AuthGuard] },
	{ path: 'account', loadChildren: accountModule },
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
