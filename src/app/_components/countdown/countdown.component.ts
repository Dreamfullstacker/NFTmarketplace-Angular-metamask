import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
})
export class CountdownComponent implements OnInit {
  private subscription: Subscription;

  @Input() expiry = '';
  @Input() type = 'large';

  
  

  public dateNow = new Date();
  public dDay = new Date(this.expiry);
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    if (timeDifference > 0){
      this.secondsToDday = Math.floor(
        (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
      );
      this.minutesToDday = Math.floor(
        (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
          this.SecondsInAMinute
      );
      this.hoursToDday = Math.floor(
        (timeDifference /
          (this.milliSecondsInASecond *
            this.minutesInAnHour *
            this.SecondsInAMinute)) %
          this.hoursInADay
      );
      this.daysToDday = Math.floor(
        timeDifference /
          (this.milliSecondsInASecond *
            this.minutesInAnHour *
            this.SecondsInAMinute *
            this.hoursInADay)
      );
    } else {
      this.secondsToDday = 0
      this.minutesToDday = 0;
      this.hoursToDday = 0;
      this.daysToDday = 0;
      window.location.reload()
    }
  }

  ngOnInit() {
     console.log(this.expiry);
    console.log(new Date(this.expiry));
    this.dDay = new Date(this.expiry);
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
