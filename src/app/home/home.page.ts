import { Component , ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { PopoverController, NavParams } from '@ionic/angular';
import { HomePopoverComponent } from '../home-popover/home-popover.component';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';
import { SourceListMap } from 'source-list-map';
import { Storage } from '@ionic/storage';

declare var window;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('doughnutChart', { static: true }) doughnutChart;

  bars:any;
  colorArray: any;
  constructor(public popoverController: PopoverController, private dragulaService: DragulaService, private toastController: ToastController) {

    window.home = this;

    //Drag
    this.dragulaService.drag('bag')
    .subscribe(({ name, el, source }) => {
      
    });

    // Remove Model
    this.dragulaService.removeModel('bag')
    .subscribe(({ item }) => {
      this.toastController.create({
        message: 'Removed: ' + item.value,
        duration: 2000
      }).then(toast => toast.present());
    });

    //Drop Model
    this.dragulaService.dropModel('bag')
      .subscribe(({ item }) => {
        
      });

    // Create Group
    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });  
  }


  addTodo() {
    // switch (this.selectedQuadrant) {
    //   case 'q1':
    //     this.todo.color = 'primary';
    //     break;
    //   case 'q2':
    //     this.todo.color = 'secondary';
    //     break;
    //   case 'q3':
    //     this.todo.color = 'tertiary';
    //     break;
    //   case 'q4':
    //     this.todo.color = 'warning';
    //     break;
    // }
    // this[this.selectedQuadrant].push(this.todo);
    // this.todo = { value: '', color: '' };
    this.lists.push([ { value: '9', color: 'warning' } ]);
  }

  removeHeader(index) {
    this.lists.splice(index, 1);
  }

  // addNewCard() {
  //   this[this.lists.find().push({ value: '1', color: 'dark' });
  // }

  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';

    // Drag and drop lists
    q1 = [
      { value: '1', color: 'dark' }
    ];
    q2 = [
      { value: '2', color: 'dark' }
    ];
    q3 = [
      { value: '3', color: 'dark' }
    ];
    q4 = [
      { value: '4', color: 'light' }
    ];
  
    q5 = [
      { value: '5', color: 'primary' }
    ];
  
    q6 = [
      { value: '6', color: 'primary' }
    ];
  
    q7 = [
      { value: '7', color: 'primary' }
    ];
  
    q8 = [
      { value: '8', color: 'primary' }
    ];
  
    q9 = [
      { value: '9', color: 'primary' }
    ];

  // Array of (lists of arrays)  
  lists = [
    [ { value: '1', color: 'dark' } ],
    [ { value: '2', color: 'dark' } ],
    [ { value: '3', color: 'dark' } ],
    [ { value: '4', color: 'light' } ],
    [ { value: '5', color: 'primary' } ],
    [ { value: '6', color: 'primary' } ],
    [ { value: '7', color: 'primary' } ],
    [ { value: '8', color: 'warning' } ],
    [ { value: '9', color: 'warning' } ]
  ]


  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: HomePopoverComponent,
      componentProps: {homeref:this}
      
    });
    return await popover.present();
  }

  cardItems = [];
  bigCards = [];

  createNewCard() {
    this.cardItems.push({title: 'Card Title', text: '1'});
  }

  createBigCard() {
    this.bigCards.push({title: 'Chart', text: '<here>'});
  }


  ionViewDidEnter() {
    this.createDoughnutChart();
  }
  
  generateColorArray(num) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  createDoughnutChart() {
    var colorArray = [];
    for (let i = 0; i < 5; i++) {
      colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    this.bars = new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Retail/Shop', 'Food', 'Transport', 'Withdrawals', 'Transfers'],
        datasets: [{
          label: 'Money Spent ($)',
          data: [100, 200, 50, 150, 65],
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"], // array should have same number of elements as number of dataset
          borderColor: '#FFFFFF',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
