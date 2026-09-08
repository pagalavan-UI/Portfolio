import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('threadGlow') threadGlowRef!: ElementRef<HTMLElement>;

  isMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
    this.updateThread();
  }

  private checkScroll(): void {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollY > 40;

    // Scroll spy logic
    const sections = ['home', 'work', 'about', 'skills', 'experience', 'contact'];
    let current = 'home';
    const offset = 180;

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + scrollY - offset;
        if (scrollY >= top) {
          current = id;
        }
      }
    }
    this.activeSection = current;
  }

  private updateThread(): void {
    const glow = this.threadGlowRef?.nativeElement;
    if (!glow) return;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollFraction = window.pageYOffset / scrollHeight;
    const threadHeight = window.innerHeight;
    const translateY = scrollFraction * (threadHeight - 120);

    glow.style.transform = `translateY(${translateY}px)`;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  handleCVDownload(event: Event): void {
    event.preventDefault();
    const fileUrl = 'assets/Pagalavan_M_Angular_Developer_Resume.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Pagalavan_M_Angular_Developer_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}