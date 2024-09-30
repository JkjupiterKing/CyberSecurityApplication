import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioEDComponent } from './audio-ed.component';

describe('AudioEDComponent', () => {
  let component: AudioEDComponent;
  let fixture: ComponentFixture<AudioEDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioEDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
