import { Component, inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite/flowbite.service';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private flowbiteService: FlowbiteService, private renderer2: Renderer2) { }

  mood: string = ''
  platformID = inject(PLATFORM_ID)

  toggleMode() {
    this.mood = this.mood === 'light' ? 'dark' : 'light';
    localStorage.setItem('mood', this.mood);
    this.applyMoodClass();
  }

  private applyMoodClass() {
    if (this.mood === 'dark') {
      this.renderer2.addClass(document.documentElement, 'dark');
    } else {
      this.renderer2.removeClass(document.documentElement, 'dark');
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      this.mood = localStorage.getItem('mood') || 'light';
      this.applyMoodClass();
    }

    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  }
}
