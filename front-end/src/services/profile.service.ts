import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PROFILE_LIST } from "../mocks/profile-list.mock";
import { Profile } from "src/models/profile.model";
import { LocalStorageService } from "./localstorage.service";
import { HttpClient } from '@angular/common/http';
//import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})

export class ProfileService {


  private profiles: Profile[] = [];

  private apiUrl = "http://localhost:9428/api/profiles";

  public profiles$: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>(this.profiles);

  constructor(private http: HttpClient) {
    this.getProfileList();
  }





  public async createProfile(name: string, lastName: string): Promise<void> {
    try {
      const newProfile: Profile = {
        id: this.generateNewId(),
        name,
        lastName,
        role: 'user',
        SHOW_POP_UP_TIMER: 15000,
        HINT_DISPLAY_TIME_OUT_DURATION: 5000,
        REMOVE_WRONG_ANSWER_INTERVAL: 10000,
        NUMBER_OF_ANSWERS_DISPLAYED: 4,
        SHOW_HINT_TIMER: 5,
        NUMBER_OF_HINTS_DISPLAYED: 5,
        profilePicture: "empty_path"
      };

      this.http.post(this.apiUrl, newProfile).subscribe({
        next: () => {
          this.profiles.push(newProfile);
          this.profiles$.next([...this.profiles]);
          console.log(`New profile created: ${name} ${lastName} with ID: ${newProfile.id}`);
        },
        error: (err) => {
          console.error('Failed to create profile', err);
        }
      });
    } catch (err) {
      console.error('Failed to create profile', err);
    }
  }


  getProfileList() {
    this.http.get<Profile[]>(this.apiUrl).subscribe((profilesList: Profile[]) => {
      this.profiles = profilesList;
      this.profiles$.next(profilesList);
    });
  }

  public deleteProfile(profileId: number): void {
    try {
      const url = this.apiUrl + "/" + profileId;
      console.log(url)
      this.http.delete<void>(url).subscribe({
        next: () => {
          // Filtrer le profil supprimé de la liste des profils
          this.profiles = this.profiles.filter(profile => profile.id !== profileId);
          this.profiles$.next(this.profiles);
        },
        error: (err) => {
          console.error('Failed to delete profile', err);
        }
      });
    } catch (err) { console.error('Failed to delete profile', err); }
  }



  public updateProfile(updatedProfile: Profile): void {
    console.log("bonjour")
    try {
      const index = this.profiles.findIndex(p => p.id === updatedProfile.id);
      this.http.put(this.apiUrl + "/" + updatedProfile.id, updatedProfile).subscribe({
        next: () => {
          if (index !== -1) {
            this.profiles[index] = { ...updatedProfile };
            this.profiles$.next([...this.profiles]);

            console.log(`Profile updated: ${updatedProfile.name} ${updatedProfile.lastName} with ID: ${updatedProfile.id}`);
          }
        },
        error: (err) => {
          console.log(`Failed to update profile with ID: ${updatedProfile.id} `, err);
        }
      });
    } catch(err) { console.log(`Failed to update profile with ID: ${updatedProfile.id} `, err); }

}




  private generateNewId(): number {
  return this.profiles.length > 0
    ? Math.max(...this.profiles.map(profile => profile.id)) + 1
    : 1;
}


}