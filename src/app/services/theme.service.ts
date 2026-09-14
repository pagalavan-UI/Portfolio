import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'pagalavan_portfolio_theme';
  private themeSubject: BehaviorSubject<ThemeMode>;
  public theme$: Observable<ThemeMode>;

  constructor() {
    const initialTheme = this.getInitialTheme();
    this.themeSubject = new BehaviorSubject<ThemeMode>(initialTheme);
    this.theme$ = this.themeSubject.asObservable();
    this.applyTheme(initialTheme);
    this.listenToSystemThemeChanges();
  }

  public get currentTheme(): ThemeMode {
    return this.themeSubject.value;
  }

  public get isDark(): boolean {
    return this.themeSubject.value === 'dark';
  }

  public toggleTheme(): void {
    const nextTheme: ThemeMode = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  public setTheme(theme: ThemeMode): void {
    this.applyTheme(theme);
    localStorage.setItem(this.THEME_KEY, theme);
    this.themeSubject.next(theme);
  }

  private applyTheme(theme: ThemeMode): void {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }

  private getInitialTheme(): ThemeMode {
    if (typeof window === 'undefined') return 'dark';
    
    // 1. Saved preference
    const saved = localStorage.getItem(this.THEME_KEY) as ThemeMode | null;
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }

    // 2. Default to Dark Mode (Tier-1 Obsidian Dark Luxury)
    return 'dark';
  }

  private listenToSystemThemeChanges(): void {
    // Keep dark default unless user manually toggles via the theme button
  }
}
