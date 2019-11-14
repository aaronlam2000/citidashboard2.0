import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { StorageService, Item, Preset, Box, Card, VisitSum, AwardSum, ProjectSum, Visits, Awards, Projects, Everything} from '../services/storage.service';

declare var window;

@Component({
  selector: 'app-add-options-popover',
  templateUrl: './add-options-popover.component.html',
  styleUrls: ['./add-options-popover.component.scss'],
})
export class AddOptionsPopoverComponent implements OnInit {

  newCard: Card = <Card>{}
  valueOption = "visits";
  colorOption = "blue";
  typeOption = "sum";

  passedBox = null;
  hideAddCard = null;
  hideAddBox = null;
  optionsAllData: Everything = <Everything>{};

  constructor(public popoverController: PopoverController, 
    private storageService: StorageService, 
    private navParams: NavParams) { }

  ngOnInit() {
    this.passedBox = this.navParams.get('selectedBox');
    this.hideAddCard = this.navParams.get('hiddenAddCard');
    this.hideAddBox = this.navParams.get('hiddenAddBox');
    this.optionsAllData = this.storageService.getAllData();
  }

  addBox() {
    this.optionsAllData = this.storageService.getAllData();
    switch (this.valueOption) {
      case 'visits':
        window.home.newCard.value = this.optionsAllData.sum.visitsSum;
        window.home.newCard.title = 'Visits';
        window.home.newCard.icon = 'person';
        break;
      case 'awards':
        window.home.newCard.value = this.optionsAllData.sum.awardsSum;
        window.home.newCard.title = 'Awards';
        window.home.newCard.icon = 'trophy';
        break;
      case 'projects':
        window.home.newCard.value = this.optionsAllData.sum.projectsSum;
        window.home.newCard.title = 'Projects';
        window.home.newCard.icon = 'laptop';
        break; 
      case 'shortcourses':
        window.home.newCard.value = this.optionsAllData.sum.shortCoursesSum;
        window.home.newCard.title = 'Short Courses';
        window.home.newCard.icon = 'book';
        break; 
    }

    switch (this.colorOption) {
      case 'blue':
        window.home.newCard.color = 'primary';
        break;
      case 'yellow':
        window.home.newCard.color = 'warning';
        break;
      case 'red':
        window.home.newCard.color = 'danger';
        break;
      case 'green':
        window.home.newCard.color = 'success';
        break;       
      case 'black':
        window.home.newCard.color = 'dark';
      break;   
    }

    switch (this.typeOption) {
      case 'sum':
        window.home.newCard.cardType = 'sum';
        break;
      case 'chart':
        window.home.newCard.cardType = 'chart';
        break;
    }

    window.home.addNewBox();
  }

  addCard() {
    this.optionsAllData = this.storageService.getAllData();
    switch (this.valueOption) {
      case 'visits':
        window.home.newCard.value = this.optionsAllData.sum.visitsSum;
        window.home.newCard.title = 'Visits';
        window.home.newCard.icon = 'person';
        break;
      case 'awards':
        window.home.newCard.value = this.optionsAllData.sum.awardsSum;
        window.home.newCard.title = 'Awards';
        window.home.newCard.icon = 'trophy';
        break;
      case 'projects':
        window.home.newCard.value = this.optionsAllData.sum.projectsSum;
        window.home.newCard.title = 'Projects';
        window.home.newCard.icon = 'laptop';
        break; 
      case 'shortcourses':
      window.home.newCard.value = this.optionsAllData.sum.shortCoursesSum;
      window.home.newCard.title = 'Short Courses';
      window.home.newCard.icon = 'book';
      break; 
    }

    switch (this.colorOption) {
      case 'blue':
        window.home.newCard.color = 'primary';
        break;
      case 'yellow':
        window.home.newCard.color = 'warning';
        break;
      case 'red':
        window.home.newCard.color = 'danger';
        break;
      case 'green':
        window.home.newCard.color = 'success';
        break;       
      case 'black':
        window.home.newCard.color = 'dark';
      break;   
    }

    switch (this.typeOption) {
      case 'sum':
        window.home.newCard.cardType = 'sum';
        break;
      case 'chart':
        window.home.newCard.cardType = 'chart';
        break;
    }
    // console.log("New Card = " + (JSON.stringify(this.newCard)));
    window.home.addNewCard(this.passedBox);
    this.popoverController.dismiss();
  }

  addPartners() {
    window.home.newCard.cardType = 'partners';

    window.home.newCard.color = 'light';
    window.home.newCard.title = '';
    window.home.newCard.icon = '';

    window.home.addNewBox();
  }

  addChart() {
    window.home.newCard.cardType = 'chart';

    switch (this.colorOption) {
      case 'blue':
        window.home.newCard.color = 'primary';
        break;
      case 'yellow':
        window.home.newCard.color = 'warning';
        break;
      case 'red':
        window.home.newCard.color = 'danger';
        break;
      case 'green':
        window.home.newCard.color = 'success';
        break;       
      case 'black':
        window.home.newCard.color = 'dark';
      break;   
    }
    window.home.newCard.title = 'chart';
    window.home.newCard.icon = '';

    window.home.addNewCard(this.passedBox);
  }

  addAwardChart () {
    window.home.addAwardChart = false;
    // window.home.createDoughnutChart();
  }

  closePopover() {
    this.popoverController.dismiss();
  }

}
