import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Profile } from "src/models/profile.model";
import { GUEST_PROFILE } from "../mocks/profile-list.mock";

@Injectable({
  providedIn: 'root'
})

export class CurrentProfileService {


    private current_profile: Profile = GUEST_PROFILE

    public current_profile$: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(this.current_profile);
    
    constructor() {}

    setCurrentProfile(profile: Profile) {
        this.current_profile = profile;
        this.current_profile$.next(this.current_profile);
    }

    getCurrentProfile(){
        return this.current_profile;
    }

    resetCurrentProfile(){
        console.log("Current Profile has been reset successfully")
        this.current_profile=GUEST_PROFILE;
    }
}