import { Component, OnInit, Input } from '@angular/core';
import { Folder } from '../services/folder';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
  @Input() folders: Folder[];
  indexes: number[] = [];
  ngOnInit(): void {
  }
  showSubsForId(index: number): void {
    this.indexes.push(index);
  }
  hideSubsForId(index: number): void {
    this.indexes = this.indexes.filter(i => i !== index);
  }
}
