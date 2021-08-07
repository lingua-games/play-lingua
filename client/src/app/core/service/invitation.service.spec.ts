import { TestBed } from '@angular/core/testing';

import { InvitationService } from './invitation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { GetGameWordsRequestModel } from '../models/get-game-words-request.model';
import { InvitationForm } from '../models/invitation-form.interface';

describe('InvitationService', () => {
  let service: InvitationService;
  let httpClientSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    // tslint:disable-next-line:no-any
    service = new InvitationService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.post when send method hits', () => {
    const expectedForm = { game: 'fake name' } as InvitationForm;

    service.send(expectedForm);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      service.adminApi + '/send-invitation',
      expectedForm
    );
  });

  it('should call http.get when getInvitation method hits', () => {
    const expectedForm = 'fake param';

    service.getInvitation(expectedForm);

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      service.adminApi + '/get-invitation-by-unique-key/' + expectedForm
    );
  });

  it('should call http.get when getUserList method hits', () => {
    service.getUserList();

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      service.adminApi + '/get-user-list-for-invitations/'
    );
  });

  it('should call http.post when setAsOpen method hits', () => {
    const expectedForm = { game: 'fake name' } as InvitationForm;

    service.setAsOpen(expectedForm);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      service.adminApi + '/set-invitation-open',
      expectedForm
    );
  });

  it('should call http.get when getInvitations method hits', () => {
    service.getInvitations();

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      service.adminApi + '/get-invitations'
    );
  });

  it('should call http.get when resendInvitationMail method hits', () => {
    const expectedForm = 'fake param';

    service.resendInvitationMail(expectedForm);

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      service.adminApi + `/resend-invitation-email/${expectedForm}`
    );
  });

  it('should call http.get when changeInvitationVisibility method hits', () => {
    const expectedForm = { uniqueKey: 'fake unique key', visibility: false };

    service.changeInvitationVisibility(
      expectedForm.uniqueKey,
      expectedForm.visibility
    );

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      service.adminApi + `/change-invitation-visibility/`,
      expectedForm
    );
  });
});
