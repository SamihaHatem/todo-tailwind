import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  private readonly authServices = inject(AuthService)
  private readonly observer = inject(BreakpointObserver)
  isLoading: boolean = false
  isError: boolean = false
  isMobile: any

  register(formvalue: any) {
    this.isLoading = true;
    this.authServices.register(formvalue).subscribe(
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

  checkIfMobile() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  ngOnInit(): void {
    this.checkIfMobile();
  }
}
