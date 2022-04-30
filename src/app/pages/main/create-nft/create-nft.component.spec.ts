import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNftComponent } from './create-nft.component';

describe('CreateNftComponent', () => {
  let component: CreateNftComponent;
  let fixture: ComponentFixture<CreateNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
