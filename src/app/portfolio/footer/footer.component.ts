import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  showScrollTop = false;

  constructor() { }

  ngOnInit(): void {
    this.checkScrollTopVisibility();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollTopVisibility();
  }

  private checkScrollTopVisibility() {
    this.showScrollTop = window.pageYOffset > 300;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
