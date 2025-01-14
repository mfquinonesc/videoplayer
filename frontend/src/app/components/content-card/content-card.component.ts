import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Content } from 'src/app/models/content';
import { Playlist } from 'src/app/models/playlist';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent {

  @Input() content: Content = new Content();
  @Input() playlists: Playlist[] = [];

  @Output() deleteEvent = new EventEmitter<boolean>(false);
  @Output() updateEvent = new EventEmitter<boolean>(false);


  isLoading: boolean = false;
  isEditing: boolean = false;
  isDating: boolean = false;

  constructor(private contentService: ContentService) { }

  delete() {
    this.isLoading = true;
    this.contentService.delete(this.content.contentId).subscribe({
      next: (value) => {
        if (value.status) {
          this.deleteEvent.emit(true);
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  toggle() {
    this.isEditing = !this.isEditing;
  }

  update() {
    this.updateEvent.emit(true);
    this.isEditing = false;
    this.isDating = false;
  }

  toggleSchedule() {
    this.isDating = !this.isDating;
  }
}
