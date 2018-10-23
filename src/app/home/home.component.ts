import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StudentsService } from '../data/students.service';
import { Students } from '../data/students'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  array: Students[];
  filteredStudents: any;

  tagForm: FormGroup;

  constructor (
    private ss: StudentsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.tagForm = this.fb.group({     // validations form 
      'addTag': [[], [Validators.required]]
    });

    this.ss.getStudents().subscribe(data => {
      this.array = data.students;
      this.filteredStudents = data.students;

      this.setTags(this.filteredStudents);
      this.setfound(this.filteredStudents);
    });
  }

  /////////////////// search by name feature ////////////
  onStudentsSearchKeyUp(event:any) {
    let filterValue = event.target.value.toLowerCase();

    this.filteredStudents = this.array.filter((array) => {
      if (array.firstName.toLowerCase().includes(filterValue) || 
          array.lastName.toLowerCase().includes(filterValue)) 
      {
        return true;
      }
    });
  }
  
  ////// search by tag feature. PD: couldn't finish it on time ///////////
  onTagsSearchKeyUp(event:any) {
    let filterValue = event.target.value.toLowerCase();

    this.filteredStudents = this.array.filter((array) => {
      if (array.tags.length > 0) {
        for (let i = 0; i < array.tags.length; i++) {
          if (array.tags[i].toLowerCase().includes(filterValue)) {
            return true;
          }
        }
      } else if (filterValue === '') {
        return this.filteredStudents;
      }
    });

    console.log(this.filteredStudents);
  }

 /////////////////// avatar feature ////////////
  getUrl(url) {
      let rc = url;
      return "url(" + "'" + rc + "'" + ")";
    }

  /////////////////// calculate avg feature ////////////
  getAvg(grades) {
    let avg = 0;
    let size = grades.length;

    for (let i = 0; i < size; i++) {
      avg += Number(grades[i]);
    }
    avg = avg / size;

    return avg;
  }
  ////////// collapse feature ////////////////
  isCollapsed(id, boolean) {
    let size = this.filteredStudents.length;

    for (let i = 0; i < size; i++) {
      if (this.filteredStudents[i].id === id) {
        this.filteredStudents[i].found = boolean;
      }
    }
  }

  setfound(students) {
    let size = students.length;

    for (let i = 0; i < size; i++) {
      this.filteredStudents[i].found = false;
    }
  }



  ////////////// add & display tag feature //////////////
  onTagsAddKeyUpEnter(id) {
    let size = this.filteredStudents.length;

    for (let i = 0; i < size; i++) {
      if (this.filteredStudents[i].id === id) {
        this.filteredStudents[i].tags.push(this.addTag.value);
        console.log(this.filteredStudents[i].tags);
      }
    }

    this.array = this.filteredStudents;
    this.addTag.reset();
  }

  setTags(students) {
    let size = students.length;

    for (let i = 0; i < size; i++) {
      this.filteredStudents[i].tags = [];
    }
  }

  isTags() {
    let found = false;

    if (this.filteredStudents.tags.length > 0) {
      found = true;
    }

    return found;
  }

  

  get addTag() { return this.tagForm.get('addTag'); }
}
