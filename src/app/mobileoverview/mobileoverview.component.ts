import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobileoverview',
  templateUrl: './mobileoverview.component.html',
  styleUrls: ['./mobileoverview.component.css']
})
export class MobileoverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  initScrollReveal() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
  }
}
