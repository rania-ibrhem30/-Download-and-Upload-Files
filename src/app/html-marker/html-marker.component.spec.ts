import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlMarkerComponent } from './html-marker.component';

describe('HtmlMarkerComponent', () => {
  let component: HtmlMarkerComponent;
  let fixture: ComponentFixture<HtmlMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlMarkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HtmlMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
