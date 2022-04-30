import { UtilityService } from './_services/utility.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nft-web-app';
  loaderText: string = 'Loading...'; // decorate the property with @Input()
  constructor(private utility: UtilityService) {
    utility.loader_callback.subscribe(data => {
        this.loaderText = data
    });
  }
  
  ngOnInit(): void {    
  }
  
}
