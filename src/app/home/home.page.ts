import { Component , ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { PopoverController, NavParams, Platform } from '@ionic/angular';
import { HomePopoverComponent } from '../home-popover/home-popover.component';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';
import { SourceListMap } from 'source-list-map';
import { Storage } from '@ionic/storage';
import { StorageService, Item, Preset, Box, Card} from '../services/storage.service';

declare var window;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('doughnutChart', { static: true }) doughnutChart;

  presetList: Preset[] = [];
  newPreset: Preset = <Preset>{};
  boxList: Box[] = [];
  newBox: Box = <Box>{};
  newCard: Card = { title: 'Title Test', color: 'primary',  value: '1' };
  bars:any;
  colorArray: any;

  constructor(public popoverController: PopoverController, private dragulaService: DragulaService, private toastController: ToastController, private storage: Storage, private storageService: StorageService, private plt: Platform) {

    this.plt.ready().then(() => {
      this.loadItems();
      this.loadPresets();
    })

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

  loadItems() {
    this.storageService.getItems().then(Boxes => {
      this.boxList = Boxes;
    });
  }

  loadPresets() {
    this.storageService.getPresets().then(Presets => {
      this.presetList = Presets;
    });
  }

  savePreset(boxList) {
    this.newPreset.presetId = Date.now();
    this.newPreset.presetBoxList = boxList;
    
    this.storageService.savePreset(boxList).then(box => {
      this.newPreset = <Preset>{}; //clear newPreset
      this.toastController.create({
        message: 'Preset Saved',
        duration: 2000
      }).then(toast => toast.present());
      this.loadPresets();
      
    });
  }

  addTodo() {

    this.newBox.boxId = Date.now();
    this.newBox.cardList = [ this.newCard ]
 
    this.storageService.addItem(this.newBox).then(box => {
      this.newBox = <Box>{}; //clear newBox
      this.toastController.create({
        message: 'Box Added!',
        duration: 2000
      }).then(toast => toast.present());
      this.loadItems(); // Or add it to the array directly
      
    });

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
    // this.lists.push([ { value: '9', color: 'warning' } ]);
  }

  removeHeader(index) {
    this.boxList.splice(index, 1);
  }

   // DELETE
   deleteItem(box: Box) {
    this.storageService.deleteItem(box.boxId).then(box => {
      this.toastController.create({
        message: 'Box removed!',
        duration: 2000
      }).then(toast => toast.present());
      this.loadItems(); // Or splice it from the array directly
    });
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
  // lists = [
  //   [ { value: '1', color: 'dark' } ],
  //   [ { value: '2', color: 'dark' } ],
  //   [ { value: '3', color: 'dark' } ],
  //   [ { value: '4', color: 'light' } ],
  //   [ { value: '5', color: 'primary' } ],
  //   [ { value: '6', color: 'primary' } ],
  //   [ { value: '7', color: 'primary' } ],
  //   [ { value: '8', color: 'warning' } ],
  //   [ { value: '9', color: 'warning' } ]
  // ]


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
