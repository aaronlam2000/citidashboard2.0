import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ReturnStatement } from '@angular/compiler';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { headersToString } from 'selenium-webdriver/http';


export interface Item {
  id: number,
  title: [ [{ value: string, color: string }] ],
  date: string,
  modified: number;
}

export interface Everything {
  awards: [ Awards ], 
  visits: [ Visits ],
  projects: [ Projects ],
  shortCourses: [ ShortCourses ],
  sum: AllSum,
  presets: [ Preset ];
}

export interface Preset {
  presetId: number,
  themeId: number,
  visitId: number,
  presetName: string,
  presetBoxList: [ Box ],
  dateCreated: Date;
}

export interface Box {
  boxId: number,
  localBoxId: number,
  cardList: [ Card ];
}

export interface Card {
  cardId: number,
  title: string,
  color: string,
  value: string,
  icon: string,
  cardType: string;
}

export interface Visits {
  visitId: number,
  startDate: Date,
  endDate: Date,
  name: string,
  pax: number,
  sic: string,
  host: string,
  foreignVisit: Boolean,
  dateCreated: Date;
}

export interface Awards {
  awardId: number,
  awardName: string,
  awardLevel: string,
  noOfRecipients: number,
  awardType: string,
  dateCreated: string;
}

export interface Projects {
  projectId: number,
  projectName: string,
  projectState: string,
  noOfStudents: number,
  dateCreated: Date;
}

export interface ShortCourses {
  courseId: number,
  courseName: string,
  courseSubject: string,
  courseInstructor: string,
  courseVenue: string,
  dataCreated: Date;
}

export interface Themes {
  themeId: number,
  backgroundColor: string,
  fontStyle: string,
  themeName: string,
  dateCreated: string;
  theme: [ThemeNames];
}

export interface ThemeNames {
  primary: string,
  secondary: string,
  tertiary: string,
  light: string,
  medium: string,
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
  visitsSum: string,
  projectsSum: string,
  shortCoursesSum: string,
  awardsSum: string;
}

export interface KeyCredentials {
  username: string,
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
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    "action": "GetKey"
    }
  }
let config = {
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    "Key": ''
    }
  }
  
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private http: HttpClient) { }

  //GET KEY
  getKeyUrl = "http://172.20.129.215:8088/api/GetKey";
  getKeyValue: Observable<any>;
  keyValue: KeyValue = <KeyValue>{};

  credentials: KeyCredentials = {
    username: "admin",
    password: "Sun123!"
  }

  getKey(){

    this.getKeyValue = this.http.post(`${this.getKeyUrl}`, this.credentials , get_key_config);
    if(this.getKeyValue!=null){
      this.getKeyValue.subscribe(key => config.headers.Key = key.key);
      console.log("KEY: " + config.headers.Key);
    } else {

      console.log("ERROR: No Key" );
    }
    
    
 
  }

  //  getKeyString(){
  //   this.getKey().subscribe(key => this.keyValue = key);
  //   config.headers.Key = this.keyValue.key;
  // }

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
 deleteItem(boxId: number): Promise<Box> {

  return this.storage.get(ITEMS_KEY).then((boxes: Box[]) => {
      if (!boxes || boxes.length === 0) {
        return null;
      }

      let toKeep: Box[] = [];

      for (let i of boxes) {
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
  return this.getAllData().presets;
}

refreshPresets(){
  this.storage.set(PRESET_KEY, this.retrievePresets());
}


  //Save Preset
  addPreset(preset: Preset): Promise<any> {
    this.getKey();
    console.log("Create preset Key: " + config.headers.Key);
    console.log("Preset Insert:" + JSON.stringify(preset));
    this.http.post(`${this.presetListUrl}`, preset, config).subscribe(Response => {
      console.log(Response);
      console.log(preset);
    })
      return this.storage.get(PRESET_KEY).then((presetList: Preset[]) => {
        if (presetList) {
          presetList.push(preset);
          return this.storage.set(PRESET_KEY, presetList);
        } else {
          return this.storage.set(PRESET_KEY, [preset]);
        }
      });
    
  }

  createPreset(preset: Preset) {
    this.getKey();
    console.log("Create preset Key: " + config.headers.Key);
    
    this.http.post(`${this.presetListUrl}`, preset, config).subscribe(Response => {
      console.log(Response);
      console.log("CREATED PRESET: " + preset.presetName);
    })
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

    this.visitSum = this.http.get(`${this.visitSumUrl}`, config);
    
    return this.visitSum;
  }

  getAwardsSum(): Observable<any> {

    this.awardSum = this.http.get(`${this.awardSumUrl}`, config);
    
    return this.awardSum;
  }

  getProjectsSum(): Observable<any> {

    this.projectSum = this.http.get(`${this.projectSumUrl}`, config);
    
    return this.projectSum;
  }

  // GET LIST
  getAllUrl = 'http://172.20.129.215:8088/api/GetAll';

  visitListUrl = 'http://172.20.129.215:8088/api/Visits';
  awardListUrl = 'http://172.20.129.215:8088/api/Awards';
  projectListUrl = 'http://172.20.129.215:8088/api/Projects';
  presetListUrl = 'http://172.20.129.215:8088/api/Presets';

  allDataStorage: Everything = <Everything>{};
  visitList: Observable<any>;
  awardList: Observable<any>;
  projectList: Observable<any>;
  allDataList: Observable<any>;
  test: string;

  getAllData(){
    this.allDataList = this.http.get(`${this.getAllUrl}`, config);
    
    this.allDataList.subscribe(allData => this.allDataStorage = allData);
    // console.log("getAllDataStorage: " +JSON.stringify(this.allDataStorage));

    return this.allDataStorage;
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

  createAward(award: Awards) {
    this.getKey();
    console.log("Create award Key: " + config.headers.Key);
    
    this.http.post(`${this.awardListUrl}`, award, config).subscribe(Response => {
      console.log(Response);
      console.log(award);
    })
    
    // this.nativeHttp.post(this.awardListUrl, award, {})
    // .then
    // (data => {
    //   console.log(data.status);
    //   console.log(data.data); // data received by server
    //   console.log(data.headers);

    // })
    // .catch(error => {
    //   console.log(error.status);
    //   console.log(error.error); // error message as string
    //  console.log(error.headers);
    // });
  }

}
