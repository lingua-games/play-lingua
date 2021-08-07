import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserModel } from '../models/user.model';
import { EditUserModel } from '../models/edit-user.model';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: {
    post: jasmine.Spy;
    put: jasmine.Spy;
    get: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);
    // tslint:disable-next-line:no-any
    service = new UserService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post to userUrl when add() hits', () => {
    service.add({} as UserModel);
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should put to userUrl when editUser() hits', () => {
    service.editUser(new EditUserModel());
    expect(httpClientSpy.put).toHaveBeenCalled();
  });

  it('should get to userUrl when getUserInformation() hits', () => {
    service.getUserInformation();
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should post when forgotPasswordRequest() hits', () => {
    const expectedParam = { id: 100 } as UserModel;

    service.forgotPasswordRequest(expectedParam);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      service.userUrl + 'forgot-password',
      expectedParam
    );
  });

  it('should post when resendActivationCode() hits', () => {
    const expectedParam = { id: 100 } as UserModel;

    service.resendActivationCode(expectedParam);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      service.userUrl + 'resend-activation-code',
      expectedParam
    );
  });

  it('should post when activateUser() hits', () => {
    const expectedParam = { id: 100 } as UserModel;

    service.activateUser(expectedParam);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      service.userUrl + 'activate-user',
      expectedParam
    );
  });

  it('should post when activateUser() hits', () => {
    const expectedParam = { id: 100 } as UserModel;

    service.resetPassword(expectedParam);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      service.userUrl + 'reset-password',
      expectedParam
    );
  });
});
