export interface Schedule {
    scheduleId: number;
    contentId: number;
    playlistId: number;
    startDate: Date;
    isActive: boolean;
    createdAt: Date;
    duration: number;
    contentTypeId: number;
    description: string;
    finalDate: string;
    imageUrl: string;
    title: string;
    videoUrl: string;
}
