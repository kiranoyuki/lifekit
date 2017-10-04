

import {Injectable} from "@angular/core";
import {File} from "ionic-native";

@Injectable()
export class FileSystem {
  constructor() {

  }

  public createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {
      File.writeExistingFile(dirEntry, fileName, isAppend).then(res => {
      });
    });
  }
}
