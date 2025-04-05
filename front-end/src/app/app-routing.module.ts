// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizCreationComponent } from "./pages/quiz-creation/quiz-creation.component";
import { MultiplayerGameSetupComponent } from "./pages/multiplayer-game-setup/multiplayer-game-setup.component";
import { HomeComponent } from "./pages/home/home.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { GamemodeSelectionComponent } from "./pages/gamemode-selection-page/gamemode-selection-page.component";
import { SingleplayerGamePageComponent } from './pages/singleplayer-game-page/singleplayer-game-page.component';
import { MultiplayerGamePageComponent } from './pages/multiplayer-game-page/multiplayer-game-page.component';
import { MultiplayerGameLoginPageComponent } from './pages/multiplayer-game-login-page/multiplayer-game-login-page.component';
import { MultiplayerGameAdminViewComponent } from './pages/multiplayer-game-admin-view/multiplayer-game-admin-view.component';
import { WaitingStartPageComponent } from './pages/waiting-start-page/waiting-start-page.component';
import { PlayerStatsDetailsComponent } from './pages/player-stats-details/player-stats-details.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'admin', component: AdminComponent},
  {path:'quiz-creation', component: QuizCreationComponent},
  {path:'multiplayer-game-setup', component : MultiplayerGameSetupComponent},
  {path:'gamemode-selection', component: GamemodeSelectionComponent},
  {path:'singleplayer-game',component: SingleplayerGamePageComponent},
  {path:'multiplayer-game-login', component: MultiplayerGameLoginPageComponent},
  {path:'multiplayer-game',component: MultiplayerGamePageComponent},
  {path:'multiplayer-game-admin-view',component: MultiplayerGameAdminViewComponent},
  {path:'waiting-start', component:WaitingStartPageComponent},
  {path:'player-stats-details/:id', component: PlayerStatsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }