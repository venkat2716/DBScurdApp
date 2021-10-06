import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import { UserApiService } from 'src/app/services/user-api.service';
import { UserModel } from './user-dashboard.modal';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  formValue !: FormGroup;
  usertData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  userModelObject : UserModel = new UserModel();
  constructor(
    private formbuilder: FormBuilder,
    private api : UserApiService
    ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      website: [''],
    })
    this.getAllUsers()
  }
  onClickAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postUserDetails(){
    this.userModelObject.name = this.formValue.value.name;
    this.userModelObject.email = this.formValue.value.email;
    this.userModelObject.phone = this.formValue.value.phone;
    this.userModelObject.website = this.formValue.value.website;
    this.api.postUser(this.userModelObject)
    .subscribe(res => {
      console.log(res);
      alert('User added successfully');
      let ref = document.getElementById('cancel');
      ref?.click()
      this.formValue.reset();
    },
    err => {
      alert('Something went wrong!')
    }
    )
  }

  getAllUsers() {
    this.api.getUser()
    .subscribe(res => {
      this.usertData = res;
      console.log(this.usertData)
    })
  }

  deleteUser(user: any) {
    this.api.deleteUser(user.id)
    .subscribe(res => {
      return alert('User Deleted');
      // this.getAllUsers()
    })
  }

  onEdit(user: any){
    this.userModelObject.id = user.id;
    this.formValue.controls['name'].setValue(user.name);
    this.formValue.controls['email'].setValue(user.email);
    this.formValue.controls['phone'].setValue(user.phone);
    this.formValue.controls['website'].setValue(user.website);
    this.showAdd = false;
    this.showUpdate = true;
  }

  updateUserDetails(){
    this.userModelObject.name = this.formValue.value.name;
    this.userModelObject.email = this.formValue.value.email;
    this.userModelObject.phone = this.formValue.value.phone;
    this.userModelObject.website = this.formValue.value.website;
    this.api.updateUser(this.userModelObject, this.userModelObject.id)
    .subscribe(res => {
      alert('Updated successfully')
      let ref = document.getElementById('cancel');
      ref?.click()
      this.formValue.reset();
    })
  }

}
