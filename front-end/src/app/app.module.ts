import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamemodeComponent } from './components/gamemodes/gamemode/gamemode.component';
import { GamemodeListComponent } from './components/gamemodes/gamemode-list/gamemode-list.component';
import { GamemodeSelectionComponent } from './pages/gamemode-selection-page/gamemode-selection-page.component';


@NgModule({
  declarations: [
    AppComponent,
    GamemodeComponent,
    GamemodeListComponent,
    GamemodeSelectionComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
