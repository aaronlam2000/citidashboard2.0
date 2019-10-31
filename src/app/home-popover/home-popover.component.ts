import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { StorageService, Item, Preset, Box, Card, VisitSum, AwardSum, ProjectSum, Visits, Awards, Projects, Everything} from '../services/storage.service';

declare var window;

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController, private storageService: StorageService, private navParams: NavParams) { }

  closeVisits = null;
  closeAwards = null;
  closeProjects = null;

  allData: Everything = <Everything>{};
  visitDetails: [Visits];
  awardDetails: [Awards];
  projectDetails: [Projects];

  popoverAllData: Everything = <Everything>{};


  passedCardTitle = null;

  ngOnInit() {

      this.storageService.getKey();
      // this.storageService.getAllData()
      // .subscribe(allData => this.allData = allData);

      // this.storageService.getVisitsList()
      // .subscribe(visitdetails => this.visitDetails = visitdetails);

      // this.storageService.getAwardsList()
      // .subscribe(awarddetails => this.awardDetails = awarddetails);

      // this.storageService.getProjectsList()
      // .subscribe(projectdetails => this.projectDetails = projectdetails);

      this.popoverAllData = this.storageService.getAllData();

      this.visitDetails = this.popoverAllData.visits;
      this.awardDetails = this.popoverAllData.awards;
      this.projectDetails = this.popoverAllData.projects;
      console.log("POPOVER DATA HERE: " + JSON.stringify(this.popoverAllData.visits));

      this.passedCardTitle = this.navParams.get('card_title')
      this.closeVisits = this.navParams.get('hiddenVisits')
      this.closeAwards = this.navParams.get('hiddenAwards')
      this.closeProjects = this.navParams.get('hiddenProjects')
  }


  // close() {
  //   this.popoverController.dismiss();
  // }

  // addCard() {
  //   window.home.createNewCard();
  // }

  // addChart() {
  //   window.home.createBigCard();
  // }

  // addNewCard() {
  //   window.home.addTodo();
  // }



}
