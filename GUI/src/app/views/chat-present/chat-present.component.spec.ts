import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPresentComponent } from './chat-present.component';

describe('ChatPresentComponent', () => {
  let component: ChatPresentComponent;
  let fixture: ComponentFixture<ChatPresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPresentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
