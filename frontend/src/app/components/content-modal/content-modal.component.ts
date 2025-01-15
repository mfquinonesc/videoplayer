import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Content } from 'src/app/models/content';
import { ContentType } from 'src/app/models/content-type';
import { ContentTypeService } from 'src/app/services/content-type.service';
import { ContentService } from 'src/app/services/content.service';


@Component({
  selector: 'app-content-modal',
  templateUrl: './content-modal.component.html',
  styleUrls: ['./content-modal.component.css']
})
export class ContentModalComponent implements OnInit {

  @Input() isActive: boolean = false;
  @Input() isUpdating: boolean = false;
  @Input() uContent: Content = new Content();

  @Output() closeEvent = new EventEmitter<boolean>(false);
  @Output() saveEvent = new EventEmitter<boolean>(false);

  isLoading: boolean = false;
  cTypes: ContentType[] = [];

  contentForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    contentTypeId: [1],
    image: [''],
    video: ['']
  });

  imageFile: File | any = null;
  videoFile: File | any = null;

  constructor(private fb: FormBuilder, private contentService: ContentService, private contentTypesService: ContentTypeService) {
    this.contentTypesService.types.subscribe({
      next: (value) => {
        this.cTypes = value;
      }
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  get title() {
    return this.contentForm.controls.title;
  }

  get description() {
    return this.contentForm.controls.description;
  }

  get contentTypeId() {
    return this.contentForm.controls.contentTypeId;
  }

  get image() {
    return this.contentForm.controls.image;
  }

  get video() {
    return this.contentForm.controls.video;
  }

  get imageInvalid() {
    let value = false;

    if (this.contentTypeId.value == 3 || this.contentTypeId.value == 2) {

      if (this.isUpdating && this.image.value == this.uContent.imageUrl)
        return !(this.imageFile == null && this.image.value);

      value = !(this.image.value && this.imageFile);
    }

    return value;
  }

  get videoInvalid() {
    let value = false;

    if (this.contentTypeId.value == 1 || this.contentTypeId.value == 2) {

      if (this.isUpdating && this.video.value == this.uContent.videoUrl)
        return !(this.videoFile == null && this.video.value);

      value = !(this.video.value && this.videoFile);
    }

    return value;
  }

  initialize() {
    let isUp = this.uContent.contentId && this.isUpdating;

    this.contentForm.patchValue({
      title: isUp ? this.uContent.title : '',
      description: isUp ? this.uContent.description : '',
      contentTypeId: isUp ? this.uContent.contentTypeId : 1,
    });

    this.resetFiles();
  }

  cancel() {
    this.initialize();
    this.closeEvent.emit(true);
  }

  submit() {
    if (this.isUpdating)
      this.update();
    else
      this.create();
  }

  resetFiles() {
    let isUp = this.uContent.contentId && this.isUpdating;

    this.image.reset();
    this.video.reset();

    this.contentForm.patchValue({
      image: isUp ? this.uContent.imageUrl : '',
      video: isUp ? this.uContent.videoUrl : '',
    });

    this.imageFile = null;
    this.videoFile = null;    
  }

  loadFile(event: Event) {    
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {

      if (input.files[0].type.includes('image')) {
        this.image.setValue(input.files[0].name);         
        this.imageFile = input.files[0];
      }

      if (input.files[0].type.includes('video')) {
        this.video.setValue(input.files[0].name);  
        this.videoFile = input.files[0];   
        console.log('video',this.video);
                  
      }
    }
    else{
      console.log('no carga');
      
    }
  }

  create() {
    if (this.contentForm.valid && !this.imageInvalid && !this.videoInvalid) {
      this.isLoading = true;
      let content = this.createContent();
      this.contentService.create(content).subscribe({
        next: (value) => {
          if (value.status) {
            this.saveEvent.emit(true);
            this.initialize();
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  update() {
    if (this.contentForm.valid && !this.imageInvalid && !this.videoInvalid) {
      this.isLoading = true;
      const id = this.uContent.contentId
      const content = this.createContent();
      this.contentService.update(id, content).subscribe({
        next: (value) => {
          if (value.status) {
            this.saveEvent.emit(true);
            this.initialize();
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  createContent() {
    let content = new Content();
    content.title = this.title.value || '';
    content.description = this.description.value || '';
    content.contentTypeId = this.contentTypeId.value || 0;
    content.videoFile = this.videoFile;
    content.imageFile = this.imageFile;
    return content;
  }
}
