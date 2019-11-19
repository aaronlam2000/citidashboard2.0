import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { StorageService, Item, Preset, Box, Card, VisitSum, AwardSum, ProjectSum, Visits, Awards, Projects, Everything, ShortCourses} from '../services/storage.service';

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
  closeShortCourses = null;

  allData: Everything = <Everything>{};
  visitDetails: [Visits];
  awardDetails: [Awards];
  projectDetails: [Projects];
  shortCoursesDetails: [ShortCourses];

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

      this.storageService.getAllData().subscribe(alldata => {
        this.popoverAllData = alldata;

        this.visitDetails = this.popoverAllData.visits;
        this.awardDetails = this.popoverAllData.awards;
        this.projectDetails = this.popoverAllData.projects;
        this.shortCoursesDetails = this.popoverAllData.shortCourses;
        // console.log("POPOVER DATA HERE: " + JSON.stringify(this.popoverAllData.visits));

        this.passedCardTitle = this.navParams.get('card_title')
        this.closeVisits = this.navParams.get('hiddenVisits')
        this.closeAwards = this.navParams.get('hiddenAwards')
        this.closeProjects = this.navParams.get('hiddenProjects')
        this.closeShortCourses = this.navParams.get('hiddenShortCourses')
      });

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
