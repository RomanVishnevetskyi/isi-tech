import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../models/user';

export function uniqueUsernameValidator(users: Array<User>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const username = control.value?.trim();
    const isUsernameUniq = users.some(user => user.username === username);
    return isUsernameUniq ? { usernameNotUniq: true } : null;
  };
}
