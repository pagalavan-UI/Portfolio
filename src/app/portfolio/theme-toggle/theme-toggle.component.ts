import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService, ThemeMode } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  public isDarkMode: boolean = true;
  private sub!: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.sub = this.themeService.theme$.subscribe((theme: ThemeMode) => {
      this.isDarkMode = theme === 'dark';
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
