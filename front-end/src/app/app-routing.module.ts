import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizCreationComponent } from "./pages/quiz-creation/quiz-creation.component";
import { MultiplayerGameSetupComponent } from "./pages/multiplayer-game-setup/multiplayer-game-setup.component";
import { HomeComponent } from "./pages/home/home.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { GamemodeSelectionComponent } from "./pages/gamemode-selection-page/gamemode-selection-page.component";
import { SingleplayerPageComponent } from './pages/singleplayer-page/singleplayer-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'admin', component: AdminComponent},
  {path:'quiz-creation', component: QuizCreationComponent},
  {path:'multiplayer-game-setup', component : MultiplayerGameSetupComponent},
  {path:'gamemode-selection', component: GamemodeSelectionComponent},
  {path:'singleplayer-game',component: SingleplayerPageComponent}
  //{path:'multiplayer-page',component: }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
