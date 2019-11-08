import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { StorageService, Item, Preset, Box, Card, VisitSum, AwardSum, ProjectSum, Visits, Awards, Projects, Everything, ShortCourses} from '../services/storage.service';

declare var window;

@Component({
  selector: 'app-save-preset-popover',
  templateUrl: './save-preset-popover.component.html',
  styleUrls: ['./save-preset-popover.component.scss'],
})
export class SavePresetPopoverComponent implements OnInit {

  savePresetName: string;
  passedBoxList = null;
  visitOptions: [Visits];

  constructor(public popoverController: PopoverController, 
    private storageService: StorageService, 
    private navParams: NavParams) { }

  ngOnInit() {
    this.passedBoxList = this.navParams.get('currentBoxList');
  }

  savePreset() {
    this.storageService.getKey();  
    window.home.newPreset.presetName = this.savePresetName;

    window.home.savePreset(this.passedBoxList);

    this.popoverController.dismiss();
  }

}
