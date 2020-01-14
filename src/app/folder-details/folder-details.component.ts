import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Folder} from '../services/folder';
import {FolderService} from '../services/folder.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.scss']
})
export class FolderDetailsComponent implements OnInit, OnDestroy {

  selectedFolder: Folder;
  destroy$: Subject<boolean> = new Subject<boolean>();
  id: number;
  isDetails = true;

  createFolderForm: FormGroup = new FormGroup(
    {
      name: new FormControl(''),
      text: new FormControl(''),
      urlImage: new FormControl('', Validators.pattern(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|png|svg))/)),
    }
  );


  constructor(
    private folderService: FolderService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params.id === 'newFolder') {
            this.isDetails = false;
            this.id = 0;
          } else {
            this.id = +params.id;
            this.selectedFolder = this.folderService.findFolderById(this.folderService.foldersList, this.id);
          }
        }
      );
    this.selectedFolder = null;
    this.folderService.subject.pipe(takeUntil(this.destroy$)).subscribe((folders: Folder[]) => {
      if (folders.length) {
        this.selectedFolder = this.folderService.findFolderById(folders, this.id);
      }
    });
  }

  onAddFolder(): void {
    this.isDetails = false;
  }

  public saveNewFolder(name: string, textArea: string, urlImage: string): void {
    const newFolder: Folder = {
      nameFolder: name,
      id: Math.floor((Math.random() * 1000) + 1),
      favorite: false,
      contentFolder: {
        title: '',
        text: textArea,
        image: urlImage,
      },
      subFolders: []
    };
    this.folderService.saveNewFolder(newFolder, this.id);
    this.isDetails = true;
    this.createFolderForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }

}
