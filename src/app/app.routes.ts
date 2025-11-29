import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UnitComponent } from './components/unit/unit.component';
import { UnitTypeComponent } from './components/unit-type/unit-type.component';
import { UserComponent } from './components/user/user.component';
import { authGuard } from './guards/auth.guard';
import { MapsComponent } from './components/maps/maps.component';
import { HistoryComponent } from './components/history/history.component';

export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     { path: '', redirectTo: 'home', pathMatch: 'full' },
     { path: 'home', component: HomeComponent, canActivate: [authGuard] },
     { path: 'units', component: UnitComponent, canActivate: [authGuard] },
     { path: 'unit-types', component: UnitTypeComponent, canActivate: [authGuard] },
     { path: 'users', component: UserComponent, canActivate: [authGuard] },
     { path: 'maps', component: MapsComponent, canActivate: [authGuard] },
     { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
];
