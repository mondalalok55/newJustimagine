import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookAnAppointmentPage } from './book-an-appointment.page';

describe('BookAnAppointmentPage', () => {
  let component: BookAnAppointmentPage;
  let fixture: ComponentFixture<BookAnAppointmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAnAppointmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookAnAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
