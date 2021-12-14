import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fileUpload';
  images = '';
  image = [{
    fieldname:'',
    originalname:'',
    encoding:'',
    mimetype:'',
    destination:'',
    filename:'',
    path:'',
    size:0
  }]
  multipleImages = [];
  constructor(private http: HttpClient, private imagesService:ImagesService){}

  ngOnInit(){
    this.imagesService.getImages().subscribe((data)=>{
      this.image=JSON.parse(JSON.stringify(data));
      console.log(this.image[1]);
  })

  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }


  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  
}