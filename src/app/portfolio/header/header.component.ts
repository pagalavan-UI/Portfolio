import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.checkScroll();
    
    // Initial Header Animation
    gsap.fromTo(this.el.nativeElement.querySelector('.modern-header'), 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    this.isScrolled = window.pageYOffset > 50;
    const header = document.querySelector('.modern-header');
    if (header) {
      if (this.isScrolled) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll spy logic
    const sections = ['home', 'about', 'experience', 'skills', 'project', 'contact'];
    let currentSection = 'home';
    const scrollPos = window.pageYOffset + 200; // offset for header

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && element.offsetTop <= scrollPos) {
        currentSection = section;
      }
    }
    this.activeSection = currentSection;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Setup event listener for CV download
  // setupDownloadListener(): void {
  //   const downloadCV = document.getElementById('downloadCV') as HTMLAnchorElement;
  //   if (downloadCV) {
  //     downloadCV.addEventListener('click', (e: Event) => {
  //       e.preventDefault();
  //       this.handleCVDownload();
  //     });
  //   }
  // }

  handleCVDownload(event: Event): void {
    event.preventDefault(); // Prevent default anchor click

    const fileUrl = 'assets/PagalavanM_Frontend_Resume.pdf'; // Make sure your file is in assets folder
    const messageElement = document.getElementById('downloadMessage');

    fetch(fileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('File not found');
        }
        return response.blob(); // Convert response to blob
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'PagalavanM_Frontend_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up
      })
      .catch(() => {
        if (messageElement) {
          messageElement.style.display = 'block';
          setTimeout(() => {
            messageElement.style.display = 'none';
          }, 3000);
        }
      });
  }

}