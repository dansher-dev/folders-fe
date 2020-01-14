import {Component, OnDestroy, OnInit} from '@angular/core';

import { FolderService } from './services/folder.service';

import { Folder } from './services/folder';

import {Subject} from 'rxjs';

import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  folders: Folder[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private folderService: FolderService) {
  }

  ngOnInit() {
    this.folderService.subject.pipe(takeUntil(this.destroy$)).subscribe((folders: Folder[]) => {
      this.folders = folders;
    });
    this.folderService.getData();
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
}
