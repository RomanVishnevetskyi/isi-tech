import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { emptyValidator } from '../../validators/no-empty';
import { Subject, takeUntil } from 'rxjs';
import { uniqueUsernameValidator } from '../../validators/uniq';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(private commonService: CommonService,
              private router: Router,
              private fb: FormBuilder) {
    this.userForm = this.fb.group({})
    this.users = [];
  }

  types: Array<string> = ['Admin', 'Driver'];
  users:Array<User>
  userForm: FormGroup;
  isShowForm: boolean = false;
  clickedUser!:User;
  createMode = false;
  public isEquals = false;
  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.commonService.getUsers().subscribe(
      (users) => {
        if (users) {
          this.users = users;
          this.initForm();
        }
      },
      (error) => {
        if (error.status === 403) {
          this.router.navigate(['error'])
        }
        if (error.status === 404) {
          this.router.navigate(['forbidden'])
        }
      }
    )
  }

  initForm() {
    this.userForm = this.fb.group({
      username: ['',[Validators.required, emptyValidator(),uniqueUsernameValidator(this.users)]],
      first_name: ['',[Validators.required,emptyValidator()]],
      last_name: ['',[Validators.required,emptyValidator()]],
      email: ['',[Validators.required,Validators.email]],
      types: ['',[Validators.required,emptyValidator()]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]],
      repeatPassword: ['',[Validators.required,Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]],
      id:[null]
    })
    this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(data=> {
      this.isEquals = (data.password === data.repeatPassword);
    })
    this.userForm.updateValueAndValidity();
  }

  get controls() {
    return this.userForm.controls;
  }

  onCreate() {
    const user = {
      username:this.userForm.value.username.trim(),
      first_name:this.userForm.value.first_name.trim(),
      last_name:this.userForm.value.last_name.trim(),
      email:this.userForm.value.email,
      types:this.userForm.value.types,
      password:this.userForm.value.password,
      repeatPassword:this.userForm.value.repeatPassword,
      id: Date.now(),
    }
    this.users = [...this.users,user]
    this.userForm.reset();

  }

  onHandleUser(user:User) {
    this.createMode = false;
    this.isShowForm = true;
    this.userForm.patchValue(user);
    this.clickedUser = user;
  }

  onDelete() {
    const userForDelete = {
      username:this.userForm.value.username?.trim(),
      first_name:this.userForm.value.first_name?.trim(),
      last_name:this.userForm.value.last_name?.trim(),
      email:this.userForm.value.email,
      types:this.userForm.value.types,
      password:this.userForm.value.password,
      repeatPassword:this.userForm.value.repeatPassword,
      id: this.userForm.value.id,
    }
    this.users = [...this.users.filter((user:User) => user.id !== userForDelete.id)];
    this.userForm.reset();
  }

  onUpdate() {
      const updatedUser = {
        username:this.userForm.value.username.trim(),
        first_name:this.userForm.value.first_name.trim(),
        last_name:this.userForm.value.last_name.trim(),
        email:this.userForm.value.email,
        types:this.userForm.value.types,
        password:this.userForm.value.password,
        repeatPassword:this.userForm.value.repeatPassword,
        id: this.userForm.value.id,
      }
      const index = this.users.findIndex((user:User) => user.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
        this.users = [...this.users];
      }
      this.userForm.reset();
  }

  showForm() {
    this.createMode = true;
    this.isShowForm = !this.isShowForm;
    this.userForm.reset();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
