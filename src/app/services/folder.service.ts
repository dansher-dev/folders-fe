import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Folder} from './folder';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FolderService {
  public subject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
  public foldersList: Folder[] = [];
  selectedFolder: Folder;

  constructor(public http: HttpClient, public router: Router) {
  }

  public getData(): void {
    const localData = localStorage.getItem('folders');
    if (!localData) {
      this.http.get('/assets/folders.json').subscribe((data: { folders: Folder[] }) => {
        this.foldersList = data.folders;
        this.subject.next(data.folders);
      });
    } else {
      this.foldersList = JSON.parse(localData);
      this.subject.next(this.foldersList);
    }
  }

  public findFolderById(folders: Folder[], urlInd: number): Folder {
    for (const elementFolder of folders) {
        if (elementFolder.id === urlInd) {
          this.selectedFolder = elementFolder;
        } else if (elementFolder.subFolders.length > 0) {
          this.findFolderById(elementFolder.subFolders, urlInd);
        }
    }
    return this.selectedFolder;
  }

  public saveNewFolder(newFolder: Folder, id: number): void {
    const folder = this.findFolderById(this.foldersList, id);
    if (folder) {
      folder.subFolders.push(newFolder);
      localStorage.setItem('folders', JSON.stringify(this.foldersList));
      this.subject.next(this.foldersList);
    } else {
      this.foldersList.push(newFolder);
      localStorage.setItem('folders', JSON.stringify(this.foldersList));
      this.subject.next(this.foldersList);
    }
  }

}
