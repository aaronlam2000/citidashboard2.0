import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ReturnStatement } from '@angular/compiler';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { headersToString } from 'selenium-webdriver/http';


export interface Item {
  id: number;
  title: [ [{ value: string, color: string }] ];
  date: string;
  modified: number;
}

export interface Everything {
  awards: [ Awards ];
  visits: [ Visits ];
  projects: [ Projects ];
  shortCourses: [ ShortCourses ];
  sum: AllSum;
  presets: [ Preset ];
}

export interface Preset {
  presetId: number;
  themeId: number;
  visitId: number;
  presetName: string;
  presetBoxList: [ Box ];
  dateCreated: Date;
}

export interface Box {
  boxId: number;
  localBoxId: string;
  cardList: [ Card ];
}

export interface Card {
  cardId: number;
  title: string;
  color: string;
  value: string;
  icon: string;
  cardType: string;
}

export interface Visits {
  visitId: number;
  startDate: Date;
  endDate: Date;
  name: string;
  pax: number;
  sic: string;
  host: string;
  foreignVisit: boolean;
  dateCreated: Date;
}

export interface Awards {
  awardId: number;
  awardName: string;
  awardLevel: string;
  noOfRecipients: number;
  awardType: string;
  dateCreated: string;
}

export interface Projects {
  projectId: number;
  projectName: string;
  projectState: string;
  noOfStudents: number;
  dateCreated: Date;
}

export interface ShortCourses {
  courseId: number;
  courseName: string;
  courseSubject: string;
  courseInstructor: string;
  courseVenue: string;
  dataCreated: Date;
}

export interface Themes {
  themeId: number;
  backgroundColor: string;
  fontStyle: string;
  themeName: string;
  dateCreated: string;
  theme: [ThemeNames];
}

export interface ThemeNames {
  primary: string;
  secondary: string;
  tertiary: string;
  light: string;
  medium: string;
  dark: string;
}

export interface VisitSum {
  visitsSum: string;
}
export interface AwardSum {
  awardsSum: string;
}
export interface ProjectSum {
  projectsSum: string;
}

export interface AllSum {
  visitsSum: string;
  projectsSum: string;
  shortCoursesSum: string;
  awardsSum: string;
}

export interface KeyCredentials {
  username: string;
  password: string;
}

export interface KeyValue {
  key: string;
}

const CARDS_KEY = 'card-list';
const ITEMS_KEY = 'box-list';
const PRESET_KEY = 'preset-list';

let get_key_config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    action: 'GetKey'
    }
  };
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Key: ''
    }
  };

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private http: HttpClient) { }

  getAllUrl = 'http://172.20.129.215:8088/api/GetAll';

  visitListUrl = 'http://172.20.129.215:8088/api/Visits';
  awardListUrl = 'http://172.20.129.215:8088/api/Awards';
  projectListUrl = 'http://172.20.129.215:8088/api/Projects';
  presetListUrl = 'http://172.20.129.215:8088/api/Presets/';

  visitSumUrl = 'http://172.20.129.215:8088/api/GetSum/VisitsSum';
  awardSumUrl = 'http://172.20.129.215:8088/api/GetSum/AwardsSum';
  projectSumUrl = 'http://172.20.129.215:8088/api/GetSum/ProjectsSum';

  // GET KEY
  getKeyUrl = 'http://172.20.129.215:8088/api/GetKey';
  getKeyValue: Observable<any>;
  keyValue: KeyValue = <KeyValue> {};

  credentials: KeyCredentials = {
    username: 'admin',
    password: 'Sun123!'
  };

  getKey() {

    this.getKeyValue = this.http.post(`${this.getKeyUrl}`, this.credentials , get_key_config);
    if (this.getKeyValue != null){
      this.getKeyValue.subscribe(key => config.headers.Key = key.key);
      console.log('Get Key: ' + config.headers.Key);
    } else {
      console.log('ERROR: No Key');
    }
  }

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

      const updatedBoxList: Box[] = [];

      for (const b of boxes) {
        if (b.localBoxId === box.localBoxId) {
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
 deleteItem(boxId: string): Promise<Box> {

  return this.storage.get(ITEMS_KEY).then((boxes: Box[]) => {
      if (!boxes || boxes.length === 0) {
        return null;
      }

      const toKeep: Box[] = [];

      for (const i of boxes) {
        if (i.localBoxId !== boxId) {
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

retrievePresets() {
  this.getKey();
  console.log('retrieve presets key = ' + config.headers.Key);

  this.http.get(`${this.presetListUrl}`, config).subscribe(presets => {
    return this.storage.set(PRESET_KEY, presets);
  });
  this.getKey();
}

refreshPresets(presetList){
  this.storage.set(PRESET_KEY, presetList);
}


  // Save Preset
  addPreset(preset: Preset): Promise<any> {
    this.getKey();
    console.log('Create preset Key: ' + config.headers.Key);
    console.log('Preset Insert:' + JSON.stringify(preset));

    // Web service post
    this.http.post(`${this.presetListUrl}`, preset, config).subscribe(Response => {
      console.log(Response);
      console.log(preset);
      this.getKey();
    });

    // Insert to local storage
    return this.storage.get(PRESET_KEY).then((presetList: Preset[]) => {
      if (presetList) {
        presetList.push(preset);
        return this.storage.set(PRESET_KEY, presetList);
      } else {
        return this.storage.set(PRESET_KEY, [preset]);
      }
    });
  }

   // Update Preset
   updatePreset(preset: Preset): Promise<any> {
    this.getKey();
    // Get current box-list
    this.storage.get(ITEMS_KEY).then((boxList) => {
      preset.presetBoxList = boxList;
      console.log('Updated boxList: ' + preset.presetBoxList);
      console.log('UPDATE PRESET KEY: ' + config.headers.Key);
      this.http.put(`${this.presetListUrl + preset.presetId}`, preset, config).subscribe(Response => {
        console.log(Response);
        console.log('Updated preset: ' + JSON.stringify(preset));
      });
    });

    return this.storage.get(PRESET_KEY).then((presets: Preset[]) => {
      if (!presets || presets.length === 0) {
        return null;
      }

      const updatedPresetList: Preset[] = [];

      for (const p of presets) {
        if (p.presetId === preset.presetId) {
          updatedPresetList.push(preset);
        } else {
          updatedPresetList.push(p);
        }
      }

      return this.storage.set(PRESET_KEY, updatedPresetList);
    });
  }

  deletePreset(preset: Preset): Promise<any> {

    this.getKey();

    this.http.delete(`${this.presetListUrl + preset.presetId}`, config).subscribe(Response => {
      console.log(Response);
      console.log(preset.presetName + ' deleted');
    });

    return this.storage.get(PRESET_KEY).then((presets: Preset[]) => {
      if (!presets || presets.length === 0) {
        return null;
      }

      const toKeep: Preset[] = [];

      for (const p of presets) {
        if (p.presetId !== preset.presetId) {
          toKeep.push(p);
        }
      }
      return this.storage.set(PRESET_KEY, toKeep);
    });
  }

  selectPreset(boxList) {
    this.storage.set(ITEMS_KEY, boxList);
  }

  // GET SUM

  visitSum: Observable<any>;
  awardSum: Observable<any>;
  projectSum: Observable<any>;

  // GET LIST
  allDataStorage: Everything = <Everything>{};
  presetsStorage: Preset = <Preset>{};
  visitList: Observable<any>;
  awardList: Observable<any>;
  projectList: Observable<any>;
  allDataList: Observable<any>;
  presetList: Observable<any>;
  test: string;

  getAllData(): Observable<any> {

    return this.http.get(`${this.getAllUrl}`, config);

  }

  getVisitsList(): Observable<any> {

    this.visitList = this.http.get(`${this.visitListUrl}`, config);

    return this.visitList;
  }

  getAwardsList(): Observable<any> {

    this.awardList = this.http.get(`${this.awardListUrl}`, config);

    return this.awardList;
  }

  getProjectsList(): Observable<any> {

    this.projectList = this.http.get(`${this.projectListUrl}`, config);

    return this.projectList;
  }
}
