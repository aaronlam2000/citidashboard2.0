import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id: number,
  title: [ [{ value: string, color: string }] ],
  date: string,
  modified: number
}

export interface Preset {
  presetId: number,
  presetName: string,
  presetBoxList: [ Box ]
}

export interface Box {
  boxId: number,
  cardList: [ Card ],
  boxSize: string
}

export interface Card {
  title: string,
  color: string,
  value: string,
  size: string
}


const ITEMS_KEY = 'box-list';
const PRESET_KEY = 'preset-list';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }


  // READ
  getItems(): Promise<Box[]> {
    return this.storage.get(ITEMS_KEY);
  }

  getPresets(): Promise<Preset[]> {
    return this.storage.get(PRESET_KEY);
  }

  // CREATE
  addItem(box: Box): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((boxList: Box[]) => {
      if (boxList) {
        boxList.push(box);
        return this.storage.set(ITEMS_KEY, boxList);
      } else {
        return this.storage.set(ITEMS_KEY, [box]);
      }
    });
  }

 // DELETE
 deleteItem(boxId: number): Promise<Box> {
  return this.storage.get(ITEMS_KEY).then((boxes: Box[]) => {
      if (!boxes || boxes.length === 0) {
        return null;
      }

      let toKeep: Box[] = [];

      for (let i of boxes) {
        if (i.boxId !== boxId) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }

// Delete boxes
deleteBoxes() {
  this.storage.set(ITEMS_KEY, []);
}


  //Save Preset
  addPreset(preset: Preset): Promise<any> {
    return this.storage.get(PRESET_KEY).then((presetList: Preset[]) => {
      if (presetList) {
        presetList.push(preset);
        return this.storage.set(PRESET_KEY, presetList);
      } else {
        return this.storage.set(PRESET_KEY, [preset]);
      }
    });
  }

  selectPreset(boxList) {
    this.storage.set(ITEMS_KEY, boxList)
  }

}
