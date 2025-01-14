import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Content } from 'src/app/models/content';
import { Playlist } from 'src/app/models/playlist';
import { Schedule } from 'src/app/models/schedule';
import { PlaylistService } from 'src/app/services/playlist.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css']
})
export class ScheduleModalComponent implements OnInit {

  @Input() isActive: boolean = false;
  @Input() content: Content = new Content();
  @Input() playlists: Playlist[] = [];

  @Output() cancelEvent = new EventEmitter<boolean>(false);
  @Output() saveEvent = new EventEmitter<boolean>(false);

  scheduledTimes: any[] = [];
  schedules: Schedule[] = [];

  isAdding: boolean = false;
  isLoading: boolean = false;

  scheduleForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', []],
    startDate: ['', [Validators.required]],
    playlistId: [1, [Validators.required]],
    duration: [0, [Validators.min(0), Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private playlistService: PlaylistService,
    private scheduleService: ScheduleService) {
    this.initialize();
  }

  ngOnInit(): void {
    this.scheduleForm.patchValue({
      duration: (this.content.contentTypeId == 1 || this.content.contentTypeId == 2 && this.content.duration) ? this.content.duration! : 0
    });
  }

  initialize() {
    this.scheduleService.getAll().subscribe({
      next: (value) => {
        this.schedules = value.status ? value.schedules as Schedule[] : [];
        this.schedules = this.schedules.filter(s => { return s.contentId == this.content.contentId });
        this.scheduledTimes = [];
        
        this.schedules.forEach(s => {         
          let obj = {
            listName: this.playlists.find((p) => { return p.playlistId == s.playlistId })?.name,
            date: s.startDate,
            status: s.isActive,
            scheduleId: s.scheduleId,
            duration: s.duration
          };     
          this.scheduledTimes.push(obj);
        });
      },
    });
  }

  get name() {
    return this.scheduleForm.controls.name
  }

  get description() {
    return this.scheduleForm.controls.startDate;
  }

  get startDate() {
    return this.scheduleForm.controls.startDate;
  }

  get playlistId() {
    return this.scheduleForm.controls.playlistId;
  }

  get duration() {
    return this.scheduleForm.controls.duration;
  }

  get dateInvalid() {
    return !(!this.isAdding && this.playlistId.value && this.startDate.value && this.duration.valid && this.duration.value! > 0);
  }

  get listInvalid() {
    return !(this.isAdding && this.name.valid)
  }

  createSchedule() {
    if (!this.dateInvalid) {
      this.isLoading = true;

      console.log(this.playlistId.value);

      let schedule = {
        contentId: this.content.contentId,
        playlistId: this.playlistId.value,
        startDate: new Date(this.startDate.value!),
        duration: this.duration.value!,
      } as unknown as Schedule;

      console.log('save', schedule);

      this.scheduleService.create(schedule).subscribe({
        next: (value) => {
          console.log(value);

          //this.initialize();
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  createPlaylist() {
    if (!this.listInvalid) {
      this.isLoading = true;
      let list = { name: this.name.value, description: this.description.value } as Playlist;
      this.playlistService.create(list).subscribe({
        next: (value) => {
          if (value.status) {
            this.isAdding = false;
          } else {
            alert('Nombre repetido');
          }
        },
        complete: () => {
          this.playlistService.getAll().subscribe({
            next: (value) => {
              if (value.status) {
                this.playlists = value.playlists ? value.playlists as Playlist[] : [];
                this.playlistService.playlists = this.playlists;
              }
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        },
      });
    }
  }

  delete(id: number) {
    this.isLoading = true;
    this.scheduleService.delete(id).subscribe({
      next: (value) => {
        this.initialize();
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  cancel() {
    if (this.isAdding) {
      this.isAdding = false;
    } else {
      this.cancelEvent.emit(true);
    }
  }

  toggle() {
    this.isAdding = !this.isAdding;
  }

  submit() {
    if (this.isAdding) {
      this.createPlaylist();
    } else {
      this.createSchedule();
    }
  }
}
