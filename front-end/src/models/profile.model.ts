export interface Profile {
    id: number;
    name: string;
    lastName: string;
    role:string;
    HINT_DISPLAY_TIME_OUT_DURATION: number;
    SHOW_POP_UP_TIMER: number,
    SHOW_HINT_TIMER:number,
    REMOVE_WRONG_ANSWER_INTERVAL: number,
    NUMBER_OF_ANSWERS_DISPLAYED:number,
    NUMBER_OF_HINTS_DISPLAYED:number,
    profilePicture:string,
    birthDate?: string;
}