export class Content {
    contentId: number = 0;
    title: string = '';
    videoUrl?: string;
    imageUrl?: string;
    description?: string;
    duration?: number;
    contentTypeId: number = 0;
    createdAt?:Date;
    imageFile?: File | any;
    videoFile?: File | any;

    get formData(): FormData {
        const formData = new FormData();    
       
        formData.append("contentId", this.contentId.toString());
        formData.append("title", this.title);
        formData.append("description", this.description || "");
        formData.append("duration", this.duration?.toString() || "");
        formData.append("contentTypeId", this.contentTypeId.toString());    
        
        if (this.imageUrl) {
          formData.append("imageUrl", this.imageUrl);
        }
            
        if (this.videoUrl) {
          formData.append("videoUrl", this.videoUrl);
        }    
        
        if (this.imageFile) {
          formData.append("imageFile", this.imageFile);
        }
    
        if (this.videoFile) {
          formData.append("videoFile", this.videoFile);
        }    
       
        if (this.createdAt) {
          formData.append("createdAt", this.createdAt.toISOString());
        }
    
        return formData;
      }
  
}
