import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;

  constructor() { }

  ngOnInit(): void {
    this.checkScroll();
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