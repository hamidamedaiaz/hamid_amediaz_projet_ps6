import { Profile } from '../models/profile.model';

export const PROFILE_LIST: Profile[] = [
    {
        id: 1,
        name: "Lionel",
        lastName: "Messi"
    },
    {
        id: 2,
        name: "Christiano",
        lastName: "Ronaldo"
    },
    {
        id: 3,
        name: "Kylian",
        lastName: "Mbappé"
    },
    {
        id: 4,
        name: "Neymar",
        lastName: "Jr."
    },
    {
        id: 5,
        name: "Erling",
        lastName: "Haaland"
    }
]

export const GUEST_PROFILE: Profile = {
    id: -1,
    name: 'Guest',
    lastName: 'User',
};
