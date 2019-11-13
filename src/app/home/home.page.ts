import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { DragulaService } from 'ng2-dragula';
import { AddOptionsPopoverComponent } from '../add-options-popover/add-options-popover.component';
import { HomePopoverComponent } from '../home-popover/home-popover.component';
import { SavePresetPopoverComponent } from '../save-preset-popover/save-preset-popover.component';
import { AuthService } from '../services/auth.service';
import { Awards, AwardSum, Box, Card, Everything, KeyValue, Preset, Projects, ProjectSum, StorageService, Visits, VisitSum } from '../services/storage.service';
import { ThemeService } from '../services/theme.service';

const themes = {
  default: {
  },
  
  autumn: {
    primary: '#F78154',
    secondary: '#4D9078',
    tertiary: '#B4436C',
    light: '#FDE8DF',
    medium: '#FCD0A2',
    dark: '#B89876'
   },
   night: {
    // primary: '#8CBA80',
    // secondary: '#FCFF6C',
    // tertiary: '#FE5F55',
    // medium: '#BCC2C7',
    // dark: '#F7F7FF',
    // light: '#495867'
    primary: '#091935',
    secondary: '#091935',
    tertiary: '#091935',
    success: '#091935',
    warning: '#091935',
    danger: '#091935',
    dark: '#091935',
    medium: '#091935',
    light: '#091935'
   },
   neon: {
    primary: '#39BFBD',
    success: '#000000',
    secondary: '#4CE0B3',
    tertiary: '#FF5E79',
    light: '#F4EDF2',
    medium: '#B682A5',
    dark: '#34162A',
   },
   day: {
     primary: '#f7f70c',
     secondary: '#dede16',
     tertiary: '#1ec924',
     light: '#05f50d',
     medium: '#33a137',
     dark: '#3a873d'
   }
  };

declare var window;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  sliderOpts = {
    zoom: false,
    slidesPerView: 4.6,
    centeredSlides: true,
    spaceBetween: 55,
    loop: true,
  };
  // sliderOpts = {
  //   grabCursor: true,
  //   cubeEffect: {
  //     shadow: true,
  //     slideShadows: true,
  //     shadowOffset: 20,
  //     shadowScale: 0.94,
  //   },
  //   on: {
  //     beforeInit: function() {
  //       const swiper = this;
  //       swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
  //       swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
  //       const overwriteParams = {
  //         slidesPerView: 1,
  //         slidesPerColumn: 1,
  //         slidesPerGroup: 1,
  //         watchSlidesProgress: true,
  //         resistanceRatio: 0,
  //         spaceBetween: 0,
  //         centeredSlides: false,
  //         virtualTranslate: true,
  //         loop: true
  //       };
  
  //       this.params = Object.assign(this.params, overwriteParams);
  //       this.originalParams = Object.assign(this.originalParams, overwriteParams);
  //     },
  //     setTranslate: function() {
  //       const swiper = this;
  //       const {
  //         $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
  //       } = swiper;
  //       const params = swiper.params.cubeEffect;
  //       const isHorizontal = swiper.isHorizontal();
  //       const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  //       let wrapperRotate = 0;
  //       let $cubeShadowEl;
  //       if (params.shadow) {
  //         if (isHorizontal) {
  //           $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
  //           if ($cubeShadowEl.length === 0) {
  //             $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
  //             $wrapperEl.append($cubeShadowEl);
  //           }
  //           $cubeShadowEl.css({ height: `${swiperWidth}px` });
  //         } else {
  //           $cubeShadowEl = $el.find('.swiper-cube-shadow');
  //           if ($cubeShadowEl.length === 0) {
  //             $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
  //             $el.append($cubeShadowEl);
  //           }
  //         }
  //       }
  
  //       for (let i = 0; i < slides.length; i += 1) {
  //         const $slideEl = slides.eq(i);
  //         let slideIndex = i;
  //         if (isVirtual) {
  //           slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
  //         }
  //         let slideAngle = slideIndex * 90;
  //         let round = Math.floor(slideAngle / 360);
  //         if (rtl) {
  //           slideAngle = -slideAngle;
  //           round = Math.floor(-slideAngle / 360);
  //         }
  //         const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
  //         let tx = 0;
  //         let ty = 0;
  //         let tz = 0;
  //         if (slideIndex % 4 === 0) {
  //           tx = -round * 4 * swiperSize;
  //           tz = 0;
  //         } else if ((slideIndex - 1) % 4 === 0) {
  //           tx = 0;
  //           tz = -round * 4 * swiperSize;
  //         } else if ((slideIndex - 2) % 4 === 0) {
  //           tx = swiperSize + (round * 4 * swiperSize);
  //           tz = swiperSize;
  //         } else if ((slideIndex - 3) % 4 === 0) {
  //           tx = -swiperSize;
  //           tz = (3 * swiperSize) + (swiperSize * 4 * round);
  //         }
  //         if (rtl) {
  //           tx = -tx;
  //         }
  
  //          if (!isHorizontal) {
  //           ty = tx;
  //           tx = 0;
  //         }
  
  //          const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
  //         if (progress <= 1 && progress > -1) {
  //           wrapperRotate = (slideIndex * 90) + (progress * 90);
  //           if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
  //         }
  //         $slideEl.transform(transform$$1);
  //         if (params.slideShadows) {
  //           // Set shadows
  //           let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
  //           let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
  //           if (shadowBefore.length === 0) {
  //             shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
  //             $slideEl.append(shadowBefore);
  //           }
  //           if (shadowAfter.length === 0) {
  //             shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
  //             $slideEl.append(shadowAfter);
  //           }
  //           if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
  //           if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
  //         }
  //       }
  //       $wrapperEl.css({
  //         '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
  //         '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
  //         '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
  //         'transform-origin': `50% 50% -${swiperSize / 2}px`,
  //       });
  
  //        if (params.shadow) {
  //         if (isHorizontal) {
  //           $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
  //         } else {
  //           const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
  //           const multiplier = 1.5 - (
  //             (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
  //             + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
  //           );
  //           const scale1 = params.shadowScale;
  //           const scale2 = params.shadowScale / multiplier;
  //           const offset$$1 = params.shadowOffset;
  //           $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
  //         }
  //       }
  
  //       const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
  //       $wrapperEl
  //         .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
  //     },
  //     setTransition: function(duration) {
  //       const swiper = this;
  //       const { $el, slides } = swiper;
  //       slides
  //         .transition(duration)
  //         .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
  //         .transition(duration);
  //       if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
  //         $el.find('.swiper-cube-shadow').transition(duration);
  //       }
  //     },
  //   }
  // }

  showChart = true;

  @ViewChild('doughnutChart', { static: true }) doughnutChart;

  authenticated = false;
  enterViewMode = false;
  exitViewMode = true;
  hideDashboard = true;

  hideVisits = true;
  hideAwards = true;
  hideProjects = true;
  hiddenShortCourses = true;
  addAwardChart = true;

  presetList: Preset[] = [];
  newPreset: Preset = <Preset>{};

  boxList: Box[] = [];
  newBox: Box = <Box>{};

  cardList: Card[] = [];
  newCard: Card = <Card>{}
  cardColor = "q1";
  cardValue = "awards";
  cardSize = "small";

  valueType = "sum";

  bars:any;
  colorArray: any;

  dateToday: Date;
  startDate: Date;
  endDate: Date;

  allData: Everything = <Everything>{};
  visitResults: VisitSum = <VisitSum>{};
  awardResults: AwardSum = <AwardSum>{};
  projectResults: ProjectSum = <ProjectSum>{};

  visitDetails: Visits = <Visits>{};
  awardDetails: Awards = <Awards>{};
  projectDetails: Projects = <Projects>{};

  visitsSum: string;
  awardsSum: string;
  projectsSum: string;
  shortCoursesSum: string;

  visitsList: string;
  awardsList: string;
  projectsList: string;

  currentVisit: string;
  checkVisitDetails: [Visits];
  checkAwardDetails: [Awards];

  academicAwardSum = 0;
  nonAcademicAwardSum = 0;
  characterAwardSum = 0;

  awardTypeSum: number[] = [];

  newAward: Awards = <Awards>{}
  keyValue: KeyValue = <KeyValue>{};

  user = {
    name: 'admin',
    pw: 'admin'
  };

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public popoverController: PopoverController, 
    private dragulaService: DragulaService, 
    private toastController: ToastController, 
    private storage: Storage, 
    private storageService: StorageService, 
    private plt: Platform, 
    private authService: AuthService, 
    private themeService: ThemeService,
    private httpClientModule: HttpClientModule) {

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
    // this.dragulaService.createGroup('bag', {
    //   removeOnSpill: false
    // });  

    this.dragulaService.createGroup("bag", {
      moves: (el, container, handle) => {
        return handle.className === 'handle';
      }
    });
  }

  ngOnInit() {
    this.authService.getUserSubject().subscribe(authState => {
      this.authenticated = authState ? true : false;


      this.storageService.getKey(); 
      
      // this.dateToday = Date.now().toString();

      // this.startDate = new Date(Date.parse("11 Nov 2019,16:45"));
      // this.endDate = new Date(Date.parse("11 Nov 2019,16:50"));
      // this.dateToday = new Date();

      // if(this.dateToday >= this.startDate && this.dateToday <= this.endDate) {
      //   console.log("Date check = true");
 
      // }
      // else {
      //   console.log("Date check = false");
      // }

      
      // console.log("Today's Date - " + this.dateToday.toString());

      // var promise=this.storageService.getKeyString();
      // promise.then(function(greeting){this.storageService.getVisitsSum()
      //   .subscribe(visits => this.visitResults = visits);},function(resson){this.storageService.getVisitsSum()
      //     .subscribe(visits => this.visitResults = visits);},function(update){this.storageService.getVisitsSum()
      //       .subscribe(visits => this.visitResults = visits);})

      // this.storageService.getKey();
      // this.storageService.getVisitsSum()
      // .subscribe(visits => this.visitResults = visits);

      // this.storageService.getKey();
      // this.storageService.getAwardsSum()
      // .subscribe(awards => this.awardResults = awards);

      // this.storageService.getKey();
      // this.storageService.getProjectsSum()
      // .subscribe(projects => this.projectResults = projects);


      // this.storageService.getKey();
      // this.storageService.getVisitsList()
      // .subscribe(visitdetails => this.visitDetails = visitdetails);

      // this.storageService.getKey();
      // this.storageService.getAwardsList()
      // .subscribe(awarddetails => this.awardDetails = awarddetails);

      // this.storageService.getKey();
      // this.storageService.getProjectsList()
      // .subscribe(projectdetails => this.projectDetails = projectdetails);

    });
  }

  logger: string;

  refreshAllData() {
    // this.storageService.getAllData()
    //   .subscribe(allData => this.allData = allData.sum);
    //   console.log("Sums: " + this.logger);
    this.storageService.refreshPresets();


    this.allData = this.storageService.getAllData();
    // console.log("Refreshed Sums: " + JSON.stringify(this.allData.sum));

    this.visitsSum = this.allData.sum.visitsSum;
    this.awardsSum = this.allData.sum.awardsSum;
    this.projectsSum = this.allData.sum.projectsSum;
    this.shortCoursesSum = this.allData.sum.shortCoursesSum;

    this.checkVisitDetails = this.allData.visits;

    for (let visit of this.checkVisitDetails) {
      
      this.startDate = new Date(Date.parse(visit.startDate.toString()));
      this.endDate = new Date(Date.parse('09 Oct 2020,14:08')); //visit.endDate.toString()
      this.dateToday = new Date();

      // console.log("Today's date: " + this.dateToday);
      // console.log(visit.name + "start: " + this.startDate);
      // console.log(visit.name + "end: " + this.endDate);
      // console.log("--------------------------------------------------");

      if (this.dateToday >= this.startDate && this.dateToday <= this.endDate) {
        this.currentVisit = visit.name;
        break;
      }
      else {
        this.currentVisit = "";
      }
    }

    this.checkAwardDetails = this.allData.awards;
      this.academicAwardSum = 0;
      this.nonAcademicAwardSum = 0;
      this.characterAwardSum = 0;
      this.awardTypeSum = [];
      
      for (let award of this.checkAwardDetails) {

        switch (award.awardType) {
          case 'Academic':
            this.academicAwardSum += 1;
            break;
          case 'Non-Academic':
            this.nonAcademicAwardSum += 1;
            break;
          case 'Character':
            this.characterAwardSum += 1;
            break;   
        }
      }
        this.awardTypeSum.push(this.academicAwardSum);
        this.awardTypeSum.push(this.nonAcademicAwardSum);
        this.awardTypeSum.push(this.characterAwardSum);

        this.createDoughnutChart();

    this.toastController.create({
      message: 'Data Refreshed',
      duration: 3000
    }).then(toast => toast.present());
  }

  displayVisitSum() {
    this.storageService.getVisitsSum()
      .subscribe(visits => this.visitResults = visits);  
  }


  // loginAdmin(name, pw) {
  //   this.authService.login(name, pw);
  // }

  loginAdmin(name) {
    this.authService.loginTest('admin', 'admin');
  }

  loginAccount() {
    try {
      this.authService.loginTest(this.user.name, this.user.pw);
      this.allData = this.storageService.getAllData();

      this.hideDashboard = false;
      // this.isHidden = true;
      // this.createDoughnutChart();
    }
    catch {
      console.log("Error: Login Failed");
    }
    
  }

  loginUser() {
    this.authService.login('user');
  }

  logout() {
    this.authService.logout();
    this.hideDashboard = true;
  }

  enterView() {
    this.enterViewMode = true;
    this.exitViewMode = false;
  }

  exitView() {
    this.enterViewMode = false;
    this.exitViewMode = true;

  }

  loadCards() {
    this.storageService.getCards().then(Cards => {
      this.cardList = Cards;
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

  loadSelectedPreset(boxList) {
    this.boxList = boxList;
    this.storageService.selectPreset(boxList);
  }



  savePreset(boxList) {
    this.storageService.getKey();  
    this.newPreset.presetBoxList = boxList;
    this.newPreset.themeId = 1;
    this.newPreset.visitId = 2;

    // this.storageService.createPreset(this.newPreset);
    
    this.storageService.addPreset(this.newPreset).then(box => {
      this.newPreset = <Preset>{}; //clear newPreset
      this.toastController.create({
        message: 'Preset Saved',
        duration: 2000
      }).then(toast => toast.present());
      this.loadPresets();
      
    });
  }

  // Delete boxes
  clearBoxes() {
    this.storageService.deleteBoxes();
    this.boxList = [];
  }


  addNewBox() {
    this.newBox.localBoxId = Date.now();

    this.newBox.cardList = [ this.newCard ];

    this.storageService.addBox(this.newBox).then(box => {
      this.newBox = <Box>{}; //clear newBox
      this.newCard = <Card>{};
      this.toastController.create({
        message: 'Box Added!',
        duration: 2000
      }).then(toast => toast.present());
      this.loadItems(); // Or add it to the array directly
      
    });
  }

  addNewCard(box: Box) {
    // this.newCard.cardId = Date.now();

    box.cardList.push(this.newCard);  
    // this.createDoughnutChart();
    
    this.storageService.updateBox(box).then(box => {
      this.toastController.create({
        message: 'Card Added!',
        duration: 2000
      }).then(toast => toast.present());
      this.loadItems();
    });
  }

  updateSumData(box: Box, card:Card) {
    const index = box.cardList.indexOf(card);

    if (index != -1) {
      if (card.title == 'Awards') {
        card.value = this.awardResults.awardsSum;
        this.hideVisits = true;
        this.hideAwards = false;
        this.hideProjects = true;
      }
      else if (card.title == 'Visits') {
        card.value = this.visitResults.visitsSum;
        this.hideVisits = false;
        this.hideAwards = true;
        this.hideProjects = true;
      }
      else if (card.title == 'Projects') {
        card.value = this.projectResults.projectsSum;
        this.hideVisits = true;
        this.hideAwards = true;
        this.hideProjects = false;
      }
      
      this.storageService.updateBox(box).then(box => {
        this.toastController.create({
          message: card.title + ' Refreshed!',
          duration: 3000
        }).then(toast => toast.present());
        this.loadItems();
      });

      
    }
    
  }

  deleteCard(box: Box, card: Card) {
    const index = box.cardList.indexOf(card);

    if (index != -1) {
      box.cardList.splice(index, 1)

      this.storageService.updateBox(box).then(box => {
        this.toastController.create({
          message: card.title + ' Deleted!',
          duration: 3000
        }).then(toast => toast.present());
        this.loadItems();
      });
    }
    else {
      this.toastController.create({
        message: card.title + ' could not be deleted Index: ' + index.toString(),
        duration: 5000
      }).then(toast => toast.present());
    }
    
  }

  // Delete Box
  deleteItem(box: Box) {
    this.storageService.deleteItem(box.localBoxId).then(box => {
      this.toastController.create({
        message: 'Box removed!',
        duration: 2000
      }).then(toast => toast.present());
      this.loadItems(); // Or splice it from the array directly
    });
  }


  // todo = { value: '', color: '' };
  // selectedQuadrant = 'q1';


  async presentPopover(card) {

    this.storageService.getKey();  

    switch (card.title) {
      case 'Visits':
        this.hideVisits = false;
        this.hideAwards = true;
        this.hideProjects = true;    
        this.hiddenShortCourses = true;
        break;

      case 'Awards':
        this.hideVisits = true;
        this.hideAwards = false;
        this.hideProjects = true;    
        this.hiddenShortCourses = true;    
        break;

      case 'Projects':
      this.hideVisits = true;
      this.hideAwards = true;
      this.hideProjects = false;   
      this.hiddenShortCourses = true;     
      break;

      case 'Short Courses':
      this.hideVisits = true;
      this.hideAwards = true;
      this.hideProjects = true;     
      this.hiddenShortCourses = false;   
      break;
    }

    const popover = await this.popoverController.create({
      component: HomePopoverComponent,
      componentProps: {
        homeref:this,
        card_title: card.title,
        hiddenVisits: this.hideVisits,
        hiddenAwards: this.hideAwards,
        hiddenProjects: this.hideProjects,
        hiddenShortCourses: this.hiddenShortCourses
      }
      
    });
    return await popover.present();
  }

  async presentOptions() {
    
    const popover = await this.popoverController.create({
      component: AddOptionsPopoverComponent,
      componentProps: {
        homeref:this,
        hiddenAddCard: true,
        hiddenAddBox: false
      }
      
    });
    return await popover.present();
  }

  async presentSavePresetPopover(boxList) {

    this.storageService.getKey();  
    
    const popover = await this.popoverController.create({
      component: SavePresetPopoverComponent,
      componentProps: {
        homeref:this,
        currentBoxList: boxList,
      }
    });
    return await popover.present();
  }

  async presentCardOptions(box: Box) {
    
    const popover = await this.popoverController.create({
      component: AddOptionsPopoverComponent,
      componentProps: {
        homeref:this,
        selectedBox: box,
        hiddenAddCard: false,
        hiddenAddBox: true
      }
      
    });
    return await popover.present();
  }

  // ionViewDidEnter() {
  //   this.createDoughnutChart();
  // }
  
  generateColorArray(num) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  deleteAwardChart() {
    this.addAwardChart = true;
  }

  createDoughnutChart() {
    var colorArray = [];
    for (let i = 0; i < 5; i++) {
      colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    console.log("Award Type Sum = " + this.awardTypeSum);
    this.bars = new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Academic', 'Non-academic', 'Character'],
        datasets: [{
          label: 'Award types',
          data: this.awardTypeSum,
          backgroundColor: colorArray, // array should have same number of elements as number of dataset
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
    console.log("BELOW HERE");
    console.log("NATIVE ELEMENT: " + this.doughnutChart.nativeElement);
  }

  changeTheme(name) {
    this.themeService.setTheme(themes[name]);
  }

  addAward() {
    this.storageService.getKey();  
    this.newAward.awardLevel = "High level";
    this.newAward.awardName = "Just anothe test";
    this.newAward.awardType = "Academic";
    this.newAward.noOfRecipients = 6;

    this.storageService.createAward(this.newAward);

    this.toastController.create({
      message: 'Award added',
      duration: 3000
    }).then(toast => toast.present());
  }

}
