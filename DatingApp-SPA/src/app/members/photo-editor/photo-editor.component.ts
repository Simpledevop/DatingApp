import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment'; // Then up to Angular to decide to bring in
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
                                                            // either development mode or production mode.

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  public uploader: FileUploader;
  hasBaseDropZoneOver = false;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 // Max file size is 10mb
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    // New Arrow function of ES6
    //     That's known as an Arrow Function, part of the ECMAScript 2015 spec...
    // Like simplier function expressions, used in callback (aka delegates) so instead of function() { }
    // can do () =>
    // e.g
    // setInterval(function () {console.log(this.count++), 1000);
    // vs etInterval(() => {console.log(this.count++), 1000);

    // e.g
    // var foo = ['a', 'ab', 'abc'];

    // var bar = foo.map(f => f.length);

    // console.log(bar); // 1,2,3
    // Shorter syntax than the previous:

    // BEFORE ES6:
    // var foo = ['a', 'ab', 'abc'];

    // var bar = foo.map(function (f) {
    //   return f.length;
    // });
    // console.log(bar); // 1,2,3

    // if you look at definition this ( ... ) passes the paramaters into a method => then callback
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }
  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      console.log('Successfully set to main');
      this.currentMain = this.photos.filter(p => p.isMain === true)[0]; // filter method returns a copy of the photos
                                                                    // array but filters out anything that doesn't match the condition.
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.getMemberPhotoChange.emit(photo.url);
    }, error => {
      this.alertify.error(error);
    });
  }
}
