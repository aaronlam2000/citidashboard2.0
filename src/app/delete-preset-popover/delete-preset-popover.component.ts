import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { StorageService, Item, Preset, Box, Card, VisitSum, AwardSum, ProjectSum, Visits, Awards, Projects, Everything, ShortCourses} from '../services/storage.service';

declare var window;

@Component({
  selector: 'app-delete-preset-popover',
  templateUrl: './delete-preset-popover.component.html',
  styleUrls: ['./delete-preset-popover.component.scss'],
})
export class DeletePresetPopoverComponent implements OnInit {

  passedPreset = null;

  constructor(public popoverController: PopoverController, 
    private storageService: StorageService, 
    private navParams: NavParams) { }

  ngOnInit() {
    this.passedPreset = this.navParams.get('currentPreset');
  }

  removePreset() {
    this.storageService.getKey();  

    window.home.presetDelete(this.passedPreset);

    this.popoverController.dismiss();
  }

  closeDeletePopover() {
    this.popoverController.dismiss();
  }
}
