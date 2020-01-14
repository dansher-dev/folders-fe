class Content {
  title: string;
  text: string;
  image: string;
}

export class Folder {
  id: number;
  nameFolder: string;
  favorite: boolean;
  contentFolder: Content;
  subFolders: Array<Folder>;
}
