import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, ViewChild } from '@angular/core';

@Component({ selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.css'] })
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('menuToggle') menuToggle!: ElementRef<HTMLButtonElement>;
  isMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';
  readonly navigation = [
    { id: 'work', label: 'Work' }, { id: 'experience', label: 'Experience' },
    { id: 'frontend', label: 'Frontend' }, { id: 'mobile', label: 'Mobile' },
    { id: 'skills', label: 'Stack' }, { id: 'about', label: 'About' }
  ];
  private frame = 0;
  private sections: HTMLElement[] = [];
  private readonly onScroll = () => {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      let active = 'home';
      for (const section of this.sections) {
        if (section.getBoundingClientRect().top <= 160) active = section.id;
      }
      const scrolled = window.scrollY > 20;
      if (active !== this.activeSection || scrolled !== this.isScrolled) {
        this.zone.run(() => { this.activeSection = active; this.isScrolled = scrolled; });
      }
    });
  };
  constructor(private zone: NgZone, private element: ElementRef<HTMLElement>) {}
  ngAfterViewInit(): void {
    this.sections = Array.from(this.element.nativeElement.querySelectorAll<HTMLElement>('main section[id]'));
    this.zone.runOutsideAngular(() => { window.addEventListener('scroll', this.onScroll, { passive: true }); this.onScroll(); });
  }
  ngOnDestroy(): void { window.removeEventListener('scroll', this.onScroll); cancelAnimationFrame(this.frame); }
  toggleMenu(): void { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu(): void { this.isMenuOpen = false; }
  @HostListener('document:keydown.escape')
  closeOnEscape(): void { if (this.isMenuOpen) { this.closeMenu(); this.menuToggle.nativeElement.focus(); } }
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (this.isMenuOpen && !(event.target as HTMLElement).closest('.editorial-nav')) this.closeMenu();
  }
  skipToContent(event: Event): void {
    event.preventDefault();
    const main = this.element.nativeElement.querySelector<HTMLElement>('#main-content');
    main?.focus();
  }
}
