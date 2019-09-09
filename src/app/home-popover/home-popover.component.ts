import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

declare var window;

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}


  close() {
    this.popoverController.dismiss();
  }

  addCard() {
    window.home.createNewCard();
  }

  addChart() {
    window.home.createBigCard();
  }

}
