import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { StorageService, Item, Preset, Box, Card, VisitSum, AwardSum, ProjectSum, Visits, Awards, Projects} from '../services/storage.service';

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

  passedBox = null;
  hideAddCard = null;
  hideAddBox = null;

  constructor(public popoverController: PopoverController, 
    private storageService: StorageService, 
    private navParams: NavParams) { }

  ngOnInit() {
    this.passedBox = this.navParams.get('selectedBox');
    this.hideAddCard = this.navParams.get('hiddenAddCard');
    this.hideAddBox = this.navParams.get('hiddenAddBox');
  }

  addBox() {
    switch (this.valueOption) {
      case 'visits':
        window.home.newCard.value = window.home.visitResults.visitsSum;
        window.home.newCard.title = 'Visits';
        window.home.newCard.icon = 'person';
        break;
      case 'awards':
        window.home.newCard.value = window.home.awardResults.awardsSum;
        window.home.newCard.title = 'Awards';
        window.home.newCard.icon = 'trophy';
        break;
      case 'projects':
        window.home.newCard.value = window.home.projectResults.projectsSum;
        window.home.newCard.title = 'Projects';
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

    window.home.addNewBox();
  }

  addCard() {
    switch (this.valueOption) {
      case 'visits':
        window.home.newCard.value = window.home.visitResults.visitsSum;
        window.home.newCard.title = 'Visits';
        window.home.newCard.icon = 'person';
        break;
      case 'awards':
        window.home.newCard.value = window.home.awardResults.awardsSum;
        window.home.newCard.title = 'Awards';
        window.home.newCard.icon = 'trophy';
        break;
      case 'projects':
        window.home.newCard.value = window.home.projectResults.projectsSum;
        window.home.newCard.title = 'Projects';
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
    console.log(this.passedBox)
    console.log(this.newCard)
    window.home.addNewCard(this.passedBox);
    this.popoverController.dismiss();
  }

  closePopover() {
    this.popoverController.dismiss();
  }

}
