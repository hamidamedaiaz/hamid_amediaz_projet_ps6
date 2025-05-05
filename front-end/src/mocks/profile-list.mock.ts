import { Profile } from '../models/profile.model';
import { SMALL,MEDIUM,LARGE } from './font-size.mocks';

export const PROFILE_LIST: Profile[] = [
    {
        id: 1,
        name: "Lionel",
        lastName: "Messi",
        role:'user',
        HINT_DISPLAY_TIME_OUT_DURATION: 0,
        SHOW_POP_UP_TIMER: 15000,
        REMOVE_WRONG_ANSWER_INTERVAL:5000,
        NUMBER_OF_ANSWERS_DISPLAYED:3,
        SHOW_HINT_TIMER:5,
        NUMBER_OF_HINTS_DISPLAYED:0,
        FONT_SIZE:MEDIUM
    },
    {
        id: 2,
        name: "Christiano",
        lastName: "Ronaldo",
        role:'user',
        HINT_DISPLAY_TIME_OUT_DURATION: 5000,
        SHOW_POP_UP_TIMER: 15000,
        REMOVE_WRONG_ANSWER_INTERVAL:10000,
        NUMBER_OF_ANSWERS_DISPLAYED:3,
        SHOW_HINT_TIMER:5,
        NUMBER_OF_HINTS_DISPLAYED:1,
        FONT_SIZE:MEDIUM
    },
    {
        id: 3,
        name: "Kylian",
        lastName: "Mbappé",
        role:'user',
        HINT_DISPLAY_TIME_OUT_DURATION: 0,
        SHOW_POP_UP_TIMER: 10000,
        REMOVE_WRONG_ANSWER_INTERVAL:5000,
        SHOW_HINT_TIMER:5,
        NUMBER_OF_ANSWERS_DISPLAYED:4,
        NUMBER_OF_HINTS_DISPLAYED:4,
        FONT_SIZE:MEDIUM
    },
    {
        id: 4,
        name: "Neymar",
        lastName: "Jr.",
        role:'user',
        HINT_DISPLAY_TIME_OUT_DURATION: 15000,
        SHOW_POP_UP_TIMER: 30000,
        REMOVE_WRONG_ANSWER_INTERVAL:7000,
        SHOW_HINT_TIMER:15,
        NUMBER_OF_ANSWERS_DISPLAYED:4,
        NUMBER_OF_HINTS_DISPLAYED:2,
        FONT_SIZE:MEDIUM
    },
    {
        id: 5,
        name: "Erling",
        lastName: "Haaland",
        role:'user',
        HINT_DISPLAY_TIME_OUT_DURATION: 30,
        NUMBER_OF_ANSWERS_DISPLAYED:4,
        SHOW_POP_UP_TIMER: 30000,
        REMOVE_WRONG_ANSWER_INTERVAL:15000,
        SHOW_HINT_TIMER:5,
        NUMBER_OF_HINTS_DISPLAYED:5,
        FONT_SIZE:MEDIUM
    }
]

export const GUEST_PROFILE: Profile = {
    id: -1,
    name: 'Guest',
    lastName: 'User',
    role:'user',
    HINT_DISPLAY_TIME_OUT_DURATION: 5000,
    SHOW_POP_UP_TIMER: 15000,
    NUMBER_OF_ANSWERS_DISPLAYED:4,
    REMOVE_WRONG_ANSWER_INTERVAL:10000,
    SHOW_HINT_TIMER:5,
    NUMBER_OF_HINTS_DISPLAYED:5,
    FONT_SIZE:MEDIUM
};

export const ADMIN_PROFILE: Profile = {
    id:0,
    name: 'Admin',
    lastName: 'Root',
    role: 'admin',
    HINT_DISPLAY_TIME_OUT_DURATION: 0,
    SHOW_POP_UP_TIMER: 99999999999,
    NUMBER_OF_ANSWERS_DISPLAYED:10,
    REMOVE_WRONG_ANSWER_INTERVAL:999999999,
    SHOW_HINT_TIMER:5,
    NUMBER_OF_HINTS_DISPLAYED:9999,
    FONT_SIZE:MEDIUM
}
