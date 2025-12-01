import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})

export class HomeComponent implements OnInit {
  ngForm!: FormGroup;
  authData: any[] = [];

  totalSlides = 0;
  // gsap.registerPlugin(ScrollTrigger: any, ScrollToPlugin: any);
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ngForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });

    this.setupGSAP();
  }

  onsubmit() {
    const value = this.ngForm.value;
    this.authData.push({
      name: value.name,
      password: value.password,
      confirmpassword: value.confirmpassword
    });
    this.ngForm.reset();
  }

  setupGSAP() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const panels = document.querySelector('.panels');
    const sections = gsap.utils.toArray<HTMLElement>('.panel');
    const activeSlide = document.querySelector('.activeSlide');
    const slideTotal = document.querySelector('.slideTotal');
    const upBtn = document.querySelector('.up');
    const dnBtn = document.querySelector('.down');

    this.totalSlides = sections.length;
    if (slideTotal) slideTotal.innerHTML = String(this.totalSlides);

    const updateUI = (keyIndexUp: number, keyIndexDown: number) => {
      if (upBtn) {
        if (keyIndexDown > 2) {
          upBtn.classList.remove('disabled');
        } else {
          upBtn.classList.add('disabled');
        }
      }

      if (dnBtn) {
        if (keyIndexDown > this.totalSlides) {
          dnBtn.classList.add('disabled');
        } else {
          dnBtn.classList.remove('disabled');
        }
      }
    };

    sections.forEach((eachPanel: HTMLElement, index: number) => {
      const realIndex = index + 1;

      ScrollTrigger.create({
        scroller: '.panels',
        trigger: eachPanel,
        start: 'top 50%',
        end: 'top bottom',
        onLeave: () => {
          eachPanel.classList.add('active');
          if (activeSlide) activeSlide.innerHTML = String(realIndex);
          const next = realIndex + 1;
          const prev = realIndex - 1;
          dnBtn?.setAttribute('data-down', String(next));
          upBtn?.setAttribute('data-up', String(prev));
          updateUI(prev, next);
        },
        onLeaveBack: () => {
          eachPanel.classList.remove('active');
          const backIndex = realIndex - 1;
          if (activeSlide) activeSlide.innerHTML = String(backIndex);
          const next = realIndex;
          const prev = realIndex - 2;
          dnBtn?.setAttribute('data-down', String(next));
          upBtn?.setAttribute('data-up', String(prev));
          updateUI(prev, next);
        }
      });
    });

    dnBtn?.addEventListener('click', () => {
      const panel = dnBtn.getAttribute('data-down');
      if (panel && parseInt(panel) <= this.totalSlides) {
        goToPanel(panel);
      }
    });

    upBtn?.addEventListener('click', () => {
      const panel = upBtn.getAttribute('data-up');
      if (panel && parseInt(panel) >= 1) {
        goToPanel(panel);
      }
    });


    function goToPanel(panel: string) {
      gsap.to(panels, {
        ease: 'power4.inOut',
        duration: 0.55,
        scrollTo: {
          y: `#panel_${panel}`,
          autoKill: false
        }
      });
    }
  }

  getAttribute() {

  }
}
