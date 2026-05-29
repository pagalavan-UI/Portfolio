import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimationService } from '../../services/animation.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private animationService: AnimationService,
    private el: ElementRef
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngAfterViewInit(): void {
    const header = this.el.nativeElement.querySelector('.section-header');
    if (header) this.animationService.revealElement(header);

    const left = this.el.nativeElement.querySelector('.gsap-left');
    const right = this.el.nativeElement.querySelector('.gsap-right');
    if (left) this.animationService.revealFromLeft(left, 0.1);
    if (right) this.animationService.revealFromRight(right, 0.2);
  }

  // onSubmit(): void {
  //   if (this.contactForm.invalid) {
  //     this.contactForm.markAllAsTouched();
  //     return;
  //   }

  //   this.isSubmitting = true;
  //   const { name, email, subject, message } = this.contactForm.value;

  //   const mailtoUrl = `mailto:pagalavan25surya@gmail.com`
  //     + `?subject=${encodeURIComponent(subject)}`
  //     + `&body=${encodeURIComponent(`Hi Pagalavan,\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}\n${email}`)}`;

  //   window.location.href = mailtoUrl;

  //   setTimeout(() => {
  //     this.isSubmitting = false;
  //     this.submitSuccess = true;
  //     this.contactForm.reset();
  //     setTimeout(() => this.submitSuccess = false, 5000);
  //   }, 1000);
  // }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { name, email, subject, message } = this.contactForm.value;

    const templateParams = {
      from_name: name,
      reply_to: email,
      subject: subject,
      message: message
    };

    emailjs.send(
      'service_1jb8fo7',       // ✅ Service ID
      'template_z010udo',      // ✅ Template ID
      templateParams,
      'e4XbnhZJVxNM1VcwS'     // ✅ Public Key
    )
      .then(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        setTimeout(() => this.submitSuccess = false, 5000);
      })
      .catch((error: any) => {
        console.error('EmailJS Error:', error);
        this.isSubmitting = false;
        alert('Failed to send message. Please try again!');
      });
  }
}
