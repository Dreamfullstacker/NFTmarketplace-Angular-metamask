import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-top-seller',
  templateUrl: './top-seller.component.html',
  styleUrls: ['./top-seller.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopSellerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
