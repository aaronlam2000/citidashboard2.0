import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { StorageService, Item, Preset, Box, Card, VisitSum, AwardSum, ProjectSum, Visits, Awards, Projects} from '../services/storage.service';

declare var window;

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController, private storageService: StorageService) { }

  closeVisits = window.home.hideVisits;
  closeAwards = window.home.hideAwards;
  closeProjects = window.home.hideProjects;

  visitDetails: Visits = <Visits>{};
  awardDetails: Awards = <Awards>{};
  projectDetails: Projects = <Projects>{};

  ngOnInit() {
      this.storageService.getVisitsList()
      .subscribe(visitdetails => this.visitDetails = visitdetails);

      this.storageService.getAwardsList()
      .subscribe(awarddetails => this.awardDetails = awarddetails);

      this.storageService.getProjectsList()
      .subscribe(projectdetails => this.projectDetails = projectdetails);
  }


  close() {
    this.popoverController.dismiss();
  }

  addCard() {
    window.home.createNewCard();
  }

  addChart() {
    window.home.createBigCard();
  }

  addNewCard() {
    window.home.addTodo();
  }



}
