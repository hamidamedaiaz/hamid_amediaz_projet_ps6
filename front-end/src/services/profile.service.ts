import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PROFILE_LIST } from "../mocks/profile-list.mock";
import { Profile } from "src/models/profile.model";
import { Router } from "@angular/router";
import { Quiz } from "../models/quiz.model";
import { LocalStorageService } from "./localstorage.service";
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

  constructor(private localStorageService:LocalStorageService) {
    //getProfileList();
    //TO DO À Décommenter quand la requête HTTP fonctionnera
  }

  

  public createProfile(name: string, lastName: string): Profile {
    const newProfile: Profile = {
      id: this.generateNewId(),
      name: name,
      lastName: lastName,
      role: 'user',
      HINT_TIME_OUT_DURATION: 5000
    };

    this.profiles.push(newProfile);
    this.profiles$.next([...this.profiles]);

    console.log(`New profile created: ${name} ${lastName} with ID: ${newProfile.id}`);

    return newProfile;
  }

  // getProfileList(){
  //   this.http.get<Profile[]>(this.apiUrl).subscribe((profilesList:Profile[]) =>
  //   this.profiles$.next(profilesList));
  // }


  public updateProfile(updatedProfile: Profile): Profile | null {
    const index = this.profiles.findIndex(p => p.id === updatedProfile.id);

    if (index !== -1) {
      this.profiles[index] = { ...updatedProfile };
      this.profiles$.next([...this.profiles]);

      console.log(`Profile updated: ${updatedProfile.name} ${updatedProfile.lastName} with ID: ${updatedProfile.id}`);

      return this.profiles[index];
    }

    console.log(`Profile not found for update with ID: ${updatedProfile.id}`);
    return null;
  }


  public deleteProfile(profileId: number): boolean {
    const initialLength = this.profiles.length;
    this.profiles = this.profiles.filter(p => p.id !== profileId);

    if (this.profiles.length !== initialLength) {
      this.profiles$.next([...this.profiles]);

      console.log(`Profile deleted with ID: ${profileId}`);
      return true;
    }

    console.log(`Profile not found for deletion with ID: ${profileId}`);
    return false;
  }


  private generateNewId(): number {
    return this.profiles.length > 0
      ? Math.max(...this.profiles.map(profile => profile.id)) + 1
      : 1;
  }


}