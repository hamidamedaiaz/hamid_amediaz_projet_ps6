import { Profile } from '../models/profile.model';

export const PROFILE_LIST: Profile[] = [
    {
        id: 1,
        name: "Lionel",
        lastName: "Messi",
        role:'user',
        HINT_TIME_OUT_DURATION: 0
    },
    {
        id: 2,
        name: "Christiano",
        lastName: "Ronaldo",
        role:'user',
        HINT_TIME_OUT_DURATION: 5000
    },
    {
        id: 3,
        name: "Kylian",
        lastName: "Mbappé",
        role:'user',
        HINT_TIME_OUT_DURATION: 10000
    },
    {
        id: 4,
        name: "Neymar",
        lastName: "Jr.",
        role:'user',
        HINT_TIME_OUT_DURATION: 15000
    },
    {
        id: 5,
        name: "Erling",
        lastName: "Haaland",
        role:'user',
        HINT_TIME_OUT_DURATION: 30000
    }
]

export const GUEST_PROFILE: Profile = {
    id: -1,
    name: 'Guest',
    lastName: 'User',
    role:'user',
    HINT_TIME_OUT_DURATION: 5000
};

export const ADMIN_PROFILE: Profile = {
    id:0,
    name: 'Admin',
    lastName: 'Root',
    role: 'admin',
    HINT_TIME_OUT_DURATION: 0
}
