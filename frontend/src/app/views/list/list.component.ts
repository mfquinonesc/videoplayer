import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { Schedule } from 'src/app/models/schedule';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  schedules: Schedule[] = [];

  playlist: Playlist = { playlistId: 1 } as Playlist;
  cSchedule: Schedule = { contentTypeId: 0 } as Schedule;

  isInfo: boolean = true;

  index: number = 0;


  constructor(private contentService: ContentService) {

  }
  ngOnInit(): void {
    this.initialize();
  }

  get isPlayer() {
    let res = false;
    if (this.cSchedule) {
      res = (this.cSchedule.contentTypeId == 1 || this.cSchedule.contentTypeId == 2);
    }
    return res;
  }

  get isBanner() {
    let res = false;
    if (this.schedules) {
      res = (this.cSchedule.contentTypeId == 2 || this.cSchedule.contentTypeId == 3);
    }
    return res;
  }

  get isVideo(){
    return (this.cSchedule.contentTypeId == 1 || this.cSchedule.contentTypeId == 2);
  }


  initialize() {
    this.contentService.getPlaylist(this.playlist.playlistId).subscribe({
      next: (value) => {       
        if (value) {
          this.schedules = value.contents as Schedule[];
          this.playlist = value.playlist as Playlist;         
          this.cSchedule = this.schedules.length ? this.schedules[this.index] : {} as Schedule;
        }
       
        console.log(this.cSchedule);
        this.cSchedule.contentTypeId = 3;
        
        this.schedules.forEach(s => {
          if (s.imageUrl) {
            s.imageUrl = this.contentService.getUrl(s.imageUrl);
          }
          if (s.videoUrl) {
            s.videoUrl = this.contentService.getUrl(s.videoUrl);
          }
        });

        console.log(this.schedules);


      },
    });

  }


  toggle() {
    this.isInfo = !this.isInfo;
  }

  play() {
    setInterval(() => {








      console.log('hola');

    }, 1000);
  }
}
