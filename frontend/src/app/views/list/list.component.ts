import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/models/content';
import { ListInfo } from 'src/app/models/list-info';
import { Playlist } from 'src/app/models/playlist';
import { Schedule } from 'src/app/models/schedule';
import { ContentService } from 'src/app/services/content.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {

  schedules: Schedule[] = [];
  playlists: Playlist[] = [];
  contents: Content[] = [];
  listInfos: ListInfo[] = [];
  copyListInfos: ListInfo[] = [];

  isLoading: boolean = false;

  content = new Content();
  isActive: boolean = false;

  constructor(private contentService: ContentService, private playlistService: PlaylistService, private scheduleService: ScheduleService) {
    this.initialize()
  }

  initialize() {

    this.scheduleService.getAll().subscribe({
      next: (value) => {
        this.schedules = value.status ? value.schedules as Schedule[] : [];
      },
      complete: () => {
        this.playlistService.getAll().subscribe({
          next: (value) => {
            this.playlists = value.status ? value.playlists as Playlist[] : [];
          },
          complete: () => {
            this.contentService.getAll().subscribe({
              next: (value) => {
                this.contents = value.status ? value.contents as Content[] : [];
              },
              complete: () => {
                this.loadInfo();
              },
            });
          },
        });
      },
    });
  }

  loadInfo() {

    this.listInfos = [];

    this.playlists.forEach(list => {

      let info = { playlist: list, schedules: [] } as ListInfo;

      info.funct = {
        isShown: false,
        toggle() {
          this.isShown = !this.isShown;
        },
      };

      const array = this.schedules.filter(s => s.playlistId == list.playlistId);
      //array.sort((a, b) => a.startDate - b.startDate)

      array.forEach(s => {
        const content = this.contents.find(c => c.contentId == s.contentId);
        info.schedules.push({
          schedule: s,
          content: content,
        });
      });

      this.listInfos.push(info);
    });

    this.copyListInfos = this.listInfos;
  }

  search(event: string) {
    if (event) {
      const words = event.toLocaleLowerCase();
      this.listInfos = this.listInfos.filter(l => {
        return l.playlist.name.toLowerCase() == words || l.playlist.description?.toLowerCase() == words;
      });
    }
    else {
      this.listInfos = this.copyListInfos;
    }
  }
}
