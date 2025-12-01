import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  constructor() { }

  ngOnInit(): void {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.applyDarkMode();
    } else {
      this.isDarkMode = false;
      this.applyLightMode();
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.applyDarkMode();
      localStorage.setItem('theme', 'dark');
    } else {
      this.applyLightMode();
      localStorage.setItem('theme', 'light');
    }
  }

  private applyDarkMode(): void {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-mode');
  }

  private applyLightMode(): void {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.remove('dark-mode');
  }
}
