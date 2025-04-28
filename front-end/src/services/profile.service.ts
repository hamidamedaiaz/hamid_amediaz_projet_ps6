import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PROFILE_LIST } from "../mocks/profile-list.mock";
import { Profile } from "src/models/profile.model";
import { Router } from "@angular/router";
import {Quiz} from "../models/quiz.model";
//import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

    private profiles: Profile[] = PROFILE_LIST;

    //private profiles: Profile[];
    // TO DO À Décommenter quand la requête HTTP fonctionnera

    private apiUrl = "/src/assets/mocks/profile-list.mock.ts";

    public profiles$: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>(this.profiles);

    constructor(private router: Router) {
      //getProfileList();
      //TO DO À Décommenter quand la requête HTTP fonctionnera
    }

    public createProfile(){
      const newProfile: Profile = {
        id: Date.now(),
        name: '',
        lastName: '',
        role:'user',
        HINT_TIME_OUT_DURATION:5000
      };
    }

    // getProfileList(){
    //   this.http.get<Profile[]>(this.apiUrl).subscribe((profilesList:Profile[]) =>
    //   this.profiles$.next(profilesList));
    // }
}
