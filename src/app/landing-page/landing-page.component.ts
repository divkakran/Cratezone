import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

const ELEMENT_DATA = [
  { latitude: 28.7041, longitude: 77.1025, iconBase: 'assets/images/icons8-marker-40.png' },
  { latitude: 28.4595, longitude: 77.0266, iconBase: 'assets/images/icons8-marker-40.png' },
  { latitude: 28.6692, longitude: 77.4538, iconBase: 'assets/images/icons8-marker-40.png' }
];
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit {
  @ViewChild('latitude') latField: ElementRef;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  latitude: number;
  longitude: number;
  dataSource: any = [];
  drawLine : any = [
    { latitude: 28.7041, longitude: 77.1025 },
    { latitude: 28.4595, longitude: 77.0266 },
    { latitude: 28.6692, longitude: 77.4538 }
  ]
  constructor(private mapsAPILoader: MapsAPILoader) { }

  public name: string;

  ngOnInit(): void {
    this.getMapData()
  }

  getMapData() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = 28.610001
        this.longitude = 77.230003;
        this.dataSource = ELEMENT_DATA;
      });
    }
  }


  //#region newLocationVariable
  isAddNew: boolean = false;
  newLatitude: any = '';
  newLongitude: any = '';
  //#endRegion

  addNewLocation() {
    this.isAddNew = true
    setTimeout(() => {
      this.latField.nativeElement.focus();
      this.scrollToBottom();
    }, 10);
  }

  saveNewLocation() {
    if (this.newLatitude == '' || this.newLongitude == '') {
      alert('Invalid Location');
      return;
    }
    let _temp = {
      'latitude': this.newLatitude,
      'longitude': this.newLongitude, 'iconBase': 'assets/images/icons8-marker-40.png'
    };
    this.dataSource.push(_temp);

    let drawLine = {latitude: +this.newLatitude,
    longitude: +this.newLongitude }

    this.drawLine.push(drawLine);


    this.isAddNew = false;
  }
  deleteLocation(index) {
    if(index <= 2){
      alert('Can not delete Predine location');
      return;
    }
    this.dataSource.splice(index, 1);
    this.drawLine.splice(index, 1);
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
