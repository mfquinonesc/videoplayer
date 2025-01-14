import { Component } from '@angular/core';
import { Content } from 'src/app/models/content';
import { ContentType } from 'src/app/models/content-type';
import { Playlist } from 'src/app/models/playlist';
import { Schedule } from 'src/app/models/schedule';
import { ContentTypeService } from 'src/app/services/content-type.service';
import { ContentService } from 'src/app/services/content.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  types: ContentType[] = [];
  contents: Content[] = [];
  playlists: Playlist[] = [];

  isEditing: boolean = false;

  constructor(private contentService: ContentService,
    private contentTypeService: ContentTypeService,
    private scheduleService: ScheduleService,
    private playlistService: PlaylistService) {
    this.initialize();
  }

  initialize() {
    this.contentService.getAll().subscribe({
      next: (value) => {
        this.contents = value.contents as Content[];
        this.contents.forEach(c => {
          if (c.imageUrl) {
            c.imageUrl = this.contentService.getUrl(c.imageUrl);
          }
          if (c.videoUrl) {
            c.videoUrl = this.contentService.getUrl(c.videoUrl);
          }
        });
      },
    });

    this.contentTypeService.getAll().subscribe({
      next: (value) => {
        this.types = value.types ? value.types as unknown as ContentType[] : [];
        this.contentTypeService.types = this.types;
      },
    });

    this.scheduleService.getAll().subscribe({
      next: (value) => {
        this.scheduleService.schedules = value.status ? value.schedules as Schedule[] : [];
      },
    });

    this.playlistService.getAll().subscribe({
      next: (value) => {
        this.playlists = value.status ? value.playlists as Playlist[] : [];
        this.playlistService.playlists = this.playlists;
      },
    });
  }

  toggle() {
    this.isEditing = !this.isEditing;
  }

  update() {
    this.initialize();
    this.isEditing = false;
  }

}
