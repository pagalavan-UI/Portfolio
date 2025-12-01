import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills = [
    'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'BootStrap', 'Git', 'REST APIs'
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
