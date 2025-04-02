import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizCreationComponent } from "./pages/quiz-creation/quiz-creation.component";
import { MultiplayerGameSetupComponent } from "./pages/multiplayer-game-setup/multiplayer-game-setup.component";
import { HomeComponent } from "./pages/home/home.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { GamemodeSelectionComponent } from "./pages/gamemode-selection-page/gamemode-selection-page.component";
import { SingleplayerGamePageComponent } from './pages/singleplayer-game-page/singleplayer-game-page.component';
import { MultiplayerGamePageComponent } from './pages/multiplayer-game-page/multiplayer-game-page.component';
import { MultiplayerGameLoginPageComponent } from './multiplayer-game-login-page/multiplayer-game-login-page.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'admin', component: AdminComponent},
  {path:'quiz-creation', component: QuizCreationComponent},
  {path:'multiplayer-game-setup', component : MultiplayerGameSetupComponent},
  {path:'gamemode-selection', component: GamemodeSelectionComponent},
  {path:'singleplayer-game',component: SingleplayerGamePageComponent},
  {path:'multiplayer-game-login', component: MultiplayerGameLoginPageComponent},
  {path:'multiplayer-game',component: MultiplayerGamePageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
