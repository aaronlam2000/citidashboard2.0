import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { StorageService, Item, Preset, Box, Card, VisitSum, AwardSum, ProjectSum, Visits, Awards, Projects, Everything, ShortCourses} from '../services/storage.service';

declare var window;

@Component({
  selector: 'app-update-preset-popover',
  templateUrl: './update-preset-popover.component.html',
  styleUrls: ['./update-preset-popover.component.scss'],
})
export class UpdatePresetPopoverComponent implements OnInit {

  passedPreset = null;

  constructor(public popoverController: PopoverController, 
    private storageService: StorageService, 
    private navParams: NavParams) { }

  ngOnInit() {
    this.passedPreset = this.navParams.get('currentPreset');
  }

  saveChanges() {
    this.storageService.getKey();  

    window.home.presetUpdate(this.passedPreset);

    this.popoverController.dismiss();
  }

  closeUpdatePopover() {
    this.popoverController.dismiss();
  }

}
