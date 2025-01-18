import { Content } from "./content";
import { Playlist } from "./playlist";
import { Schedule } from "./schedule";

export interface ListInfo {    
    playlist: Playlist;
    schedules: {
        schedule: Schedule;
        content: Content | undefined;       
    }[];
    funct?: {
        isShown: boolean,
        toggle(): void,        
    }
}

