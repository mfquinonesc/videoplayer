export interface Schedule {
    scheduleId: number;
    contentId: number;
    playlistId: number;
    startDate: Date;
    isActive: boolean;
    createdAt: Date;
    duration: number;    
}
