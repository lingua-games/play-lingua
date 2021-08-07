import { TestBed } from '@angular/core/testing';
import { SoundService } from './sound.service';
import { GameNameEnum } from '../models/game-name.enum';
import { GameActionEnum } from '../models/game-action.enum';

describe('SoundService', () => {
  let service: SoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadSounds', () => {
    it('should set appropriate value in component.songs when its SuperMario', () => {
      service.loadSounds(GameNameEnum.supperMario);

      expect(service.songs[GameActionEnum.backGroundSond].src).toEqual(
        'http://localhost:9876/assets/mario/song.mp3'
      );
      expect(service.songs[GameActionEnum.success].src).toEqual(
        'http://localhost:9876/assets/mario/success.mp3'
      );
      expect(service.songs[GameActionEnum.fail].src).toEqual(
        'http://localhost:9876/assets/mario/death.mp3'
      );
      expect(service.songs[GameActionEnum.jump].src).toEqual(
        'http://localhost:9876/assets/mario/jump.mp3'
      );
    });

    it('should not set Mario value in component.songs when its NOT SuperMario', () => {
      service.songs[GameActionEnum.backGroundSond] = { src: '' };

      service.loadSounds(GameNameEnum.fallingStars);

      expect(service.songs[GameActionEnum.backGroundSond].src).not.toEqual(
        'http://localhost:9876/assets/mario/song.mp3'
      );
    });
  });

  describe('stopGameSong', () => {
    it('should call pause the soung', () => {
      const expectedParameter = GameActionEnum.fail;
      service.songs[expectedParameter] = { pause: () => {} };
      spyOn(service.songs[expectedParameter], 'pause');

      service.stopGameSong(expectedParameter);

      expect(service.songs[expectedParameter].pause).toHaveBeenCalled();
    });
  });

  describe('playActionSong', () => {
    it('should break if isSoundOn is false', () => {
      const expectedParameter = GameActionEnum.fail;
      service.songs[expectedParameter] = { play: () => {} };
      spyOn(service.songs[expectedParameter], 'play');

      service.playActionSong(expectedParameter, false);

      expect(service.songs[expectedParameter].play).not.toHaveBeenCalled();
    });

    it('should set loop if action === GameActionEnum.backGroundSond', () => {
      const expectedParameter = GameActionEnum.backGroundSond;
      service.songs[expectedParameter] = { play: () => {}, loop: false };
      spyOn(service.songs[expectedParameter], 'play');

      service.playActionSong(expectedParameter, true);

      expect(service.songs[expectedParameter].loop).toBeTruthy();
    });

    it('should set volume to 0.03', () => {
      const expectedParameter = GameActionEnum.jump;
      service.songs[expectedParameter] = { play: () => {}, volume: 0 };
      spyOn(service.songs[expectedParameter], 'play');

      service.playActionSong(expectedParameter, true);

      expect(service.songs[expectedParameter].volume).toBe(0.03);
    });
  });
});
