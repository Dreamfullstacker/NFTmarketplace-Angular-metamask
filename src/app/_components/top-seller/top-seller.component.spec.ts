import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellerComponent } from './top-seller.component';

describe('TopSellerComponent', () => {
  let component: TopSellerComponent;
  let fixture: ComponentFixture<TopSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
