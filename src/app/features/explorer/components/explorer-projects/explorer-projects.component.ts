import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from '../../models/project-model';

@Component({
  selector: 'app-explorer-projects',
  templateUrl: './explorer-projects.component.html',
  styleUrls: ['./explorer-projects.component.scss']
})
export class ExplorerProjectsComponent implements OnInit {

  @Input() projects = <ProjectModel[]>[];

  constructor() { }

  ngOnInit() {
  }



}
