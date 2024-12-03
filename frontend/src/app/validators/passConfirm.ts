import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordsMatchValidator = (
  passwordName: string,
  confirmPasswordName: string
) => {
  return (form: AbstractControl): ValidationErrors | null => {
    const passwordControl = form.get(passwordName);
    const confirmPasswordControl = form.get(confirmPasswordName);

    if (!passwordControl || !confirmPasswordControl) {
      return null; // Return if controls are not found
    }

    // Compare the values of the password and confirm password
    if (passwordControl.value === confirmPasswordControl.value) {
      // Clear the notMatch error if they match
      if (confirmPasswordControl.errors) {
        const errors = { ...confirmPasswordControl.errors };
        delete errors['notMatch'];
        confirmPasswordControl.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
    } else {
      // Set the notMatch error if they don't match
      confirmPasswordControl.setErrors({ ...confirmPasswordControl.errors, notMatch: true });
    }

    return null; // Validators must return null or an object containing validation errors
  };
};
