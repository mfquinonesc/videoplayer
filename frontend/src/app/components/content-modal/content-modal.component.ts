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
  @Input() updateContent: Content = new Content();

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
    console.log('construc',this);    
  }

  ngOnInit(): void {
    console.log('init',this);
    
    // this.initialize();
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
    if (this.isUpdating && this.imageFile == null) {
      return !(this.image.value == this.updateContent.imageUrl && this.contentTypeId.value == this.updateContent.contentTypeId);
    }

    let value = false;
    if (this.contentTypeId.value == 3 || this.contentTypeId.value == 2)
      value = !(this.image.value && this.imageFile)

    return value;
  }

  get videoInvalid() {
    if (this.isUpdating && this.videoFile == null) {
      return !(this.video.value == this.updateContent.videoUrl && this.contentTypeId.value == this.updateContent.contentTypeId);
    }

    let value = false;
    if (this.contentTypeId.value == 1 || this.contentTypeId.value == 2)
      value = !(this.video.value && this.videoFile)

    return value;
  }

  initialize() {
    if (this.updateContent.contentId && this.isUpdating) {
      this.contentForm.patchValue({
        title: this.updateContent.title,
        description: this.updateContent.description,
        contentTypeId: this.updateContent.contentTypeId,
        image: this.updateContent.imageUrl,
        video: this.updateContent.videoUrl
      });
      this.imageFile = null;
      this.videoFile = null;
    }
  }

  clear() {
    this.resetFiles();
    this.contentForm.reset();
    this.contentForm.patchValue({ contentTypeId: 1 });
  }

  cancel() {
    this.clear();
    this.closeEvent.emit(true);
  }

  submit() {
    if (this.isUpdating) {
      this.update();
    } else {
      this.create();
    }
  }

  resetFiles() {
    if (this.isUpdating) {
      this.contentForm.patchValue({
        image: this.updateContent.imageUrl,
        video: this.updateContent.videoUrl
      });
    } else {
      this.contentForm.controls.image.reset();
      this.contentForm.controls.video.reset();
    }
    this.imageFile = null;
    this.videoFile = null;
  }

  loadContent(event: Event) {

    console.log('event',event);
    
    const input = event.target as HTMLInputElement;

    console.log('input', input);
    
    if (input?.files) {
      if (input.files[0].type.includes('image')) {
        this.imageFile = input.files[0];
        this.contentForm.patchValue({ image: this.imageFile?.name });        
      }
      if (input.files[0].type.includes('video')) {
        this.videoFile = input.files[0];
        this.contentForm.patchValue({ video: this.videoFile?.name });
      }
    }

    console.log('video',this.videoFile);
    console.log('image',this.imageFile);
    
  }

  create() {
    if (this.contentForm.valid && !this.imageInvalid && !this.videoInvalid) {
      this.isLoading = true;
      let content = this.createContent();
      this.contentService.create(content).subscribe({
        next: (value) => {
          if (value.status) {            
            this.saveEvent.emit(true);
          }
          this.clear();
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
      const id = this.updateContent.contentId
      const content = this.createContent();   
      this.contentService.update(id, content).subscribe({
        next: (value) => {
          if (value.status) {
            this.clear();
            this.saveEvent.emit(true);
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
    content.title = this.title.value!;
    content.description = this.description.value!;
    content.contentTypeId = this.contentTypeId.value || 0;
    content.videoFile = this.videoFile;
    content.imageFile = this.imageFile;
    return content;
  }
}
