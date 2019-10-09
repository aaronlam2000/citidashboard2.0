import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ReturnStatement } from '@angular/compiler';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Item {
  id: number,
  title: [ [{ value: string, color: string }] ],
  date: string,
  modified: number
}

export interface Preset {
  presetId: number,
  dateCreated: Date,
  themeId: number,
  visitId: number,
  presetName: string,
  presetBoxList: [ Box ]
}

export interface Box {
  boxId: number,
  boxName: string,
  cardList: [ Card ],
  boxSize: string
}

export interface Card {
  cardId: number,
  title: string,
  color: string,
  value: string,
  size: string
}

export interface Visits {
  visitId: number,
  companyName: string,
  companyTypeId: number,
  noOfPax: number,
  visitDate: Date,
  visitTypeId: number,
  dateCreated: Date
}

export interface Awards {
  awardId: number,
  awardName: string,
  awardLevel: string,
  noOfRecipients: number,
  awardType: string,
  dateCreated: string
}

export interface Projects {
  projectId: number,
  projectName: string,
  projectState: string,
  noOfStudents: number,
  dateCreated: Date
}

export interface Themes {
  themeId: number,
  dateCreated: string,
  backgroundColor: string,
  fontStyle: string,
  themeName: string
}


export interface VisitSum {
  visitsSum: string
}
export interface AwardSum {
  awardsSum: string
}
export interface ProjectSum {
  projectsSum: string
}

const CARDS_KEY = 'card-list';
const ITEMS_KEY = 'box-list';
const PRESET_KEY = 'preset-list';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private http: HttpClient) { }


  // READ
  getItems(): Promise<Box[]> {
    return this.storage.get(ITEMS_KEY);
  }

  getPresets(): Promise<Preset[]> {
    return this.storage.get(PRESET_KEY);
  }

  getCards(): Promise<Card[]> {
    return this.storage.get(CARDS_KEY);
  }

  // CREATE
  addBox(box: Box): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((boxList: Box[]) => {
      if (boxList) {
        boxList.push(box);
        return this.storage.set(ITEMS_KEY, boxList);
      } else {
        return this.storage.set(ITEMS_KEY, [box]);
      }
    });
  }

  // Add Card
 updateBox(box: Box): Promise<any> {
  return this.storage.get(ITEMS_KEY).then((boxes: Box[]) => {
      if (!boxes || boxes.length === 0) {
        return null;
      }

      let updatedBoxList: Box[] = [];

      for (let b of boxes) {
        if (b.boxId === box.boxId) {
          updatedBoxList.push(box);
        } else {
          updatedBoxList.push(b); 
        }
      }

      return this.storage.set(ITEMS_KEY, updatedBoxList);
    });
  }

  setCardList(updatedCardList: Card[]): Promise<any> {
    return this.storage.get(CARDS_KEY).then((cardList: Card[]) => {
      if (cardList) {
        return this.storage.set(CARDS_KEY, updatedCardList);
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

  // GET SUM
  visitSumUrl = 'http://172.20.129.215:8088/api/GetSum/VisitsSum';
  awardSumUrl = 'http://172.20.129.215:8088/api/GetSum/AwardsSum';
  projectSumUrl = 'http://172.20.129.215:8088/api/GetSum/ProjectsSum';

  visitSum: Observable<any>;
  awardSum: Observable<any>;
  projectSum: Observable<any>;

  getVisitsSum(): Observable<any> {

    this.visitSum = this.http.get(`${this.visitSumUrl}`);
    
    return this.visitSum;
  }

  getAwardsSum(): Observable<any> {

    this.awardSum = this.http.get(`${this.awardSumUrl}`);
    
    return this.awardSum;
  }

  getProjectsSum(): Observable<any> {

    this.projectSum = this.http.get(`${this.projectSumUrl}`);
    
    return this.projectSum;
  }

  // GET LIST
  visitListUrl = 'http://172.20.129.215:8088/api/Visits';
  awardListUrl = 'http://172.20.129.215:8088/api/Awards';
  projectListUrl = 'http://172.20.129.215:8088/api/Projects';

  visitList: Observable<any>;
  awardList: Observable<any>;
  projectList: Observable<any>;

  getVisitsList(): Observable<any> {

    this.visitList = this.http.get(`${this.visitListUrl}`);
    
    return this.visitList;
  }

  getAwardsList(): Observable<any> {

    this.awardList = this.http.get(`${this.awardListUrl}`);
    
    return this.awardList;
  }

  getProjectsList(): Observable<any> {

    this.projectList = this.http.get(`${this.projectListUrl}`);
    
    return this.projectList;
  }

}
