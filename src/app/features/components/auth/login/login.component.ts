import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authServices = inject(AuthService)
  isLoading: boolean = false
  isError: boolean = false

  login(formvalue: any) {
    this.isLoading = true;
    this.authServices.login(formvalue).subscribe(
      (response: any) => {
        console.log(response)
        if (response.message == 'success') {
          this.isLoading = false
          this.isError = false
        }
        else {
          this.isLoading = false
          this.isError = true
        }
      }, (err: any) => {
        console.log(err)
        this.isLoading = false
        this.isError = true
      }
    )
  }
}
