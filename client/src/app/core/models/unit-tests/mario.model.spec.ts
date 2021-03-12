import { MarioModel } from '../mario.model';

describe('MarioModel', () => {
  let model: MarioModel = new MarioModel();
  beforeEach(() => {
    model = new MarioModel();
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should set style on moveLeft', () => {
    model.style = { left: '10' };
    model.moveLeft(5);
    expect(model.style.left).toBe((10 - 5).toString() + '%');

    model.style = { left: '3' };
    model.moveLeft(5);
    expect(model.style.left).toBe('0%');
  });

  it('should set style on moveRight', () => {
    model.style = { left: '10', width: '10' };
    model.moveRight(5);
    expect(model.style.left).toBe((10 + 5).toString() + '%');

    model.style = { left: '10', width: '100' };
    model.moveRight(5);
    expect(model.style.left).toBe('0%');
  });

  describe('comeDown', () => {
    beforeEach(() => {
      model = new MarioModel();
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should call interval', () => {
      spyOn(window, 'setInterval');

      model.comeDown();

      expect(setInterval).toHaveBeenCalled();
    });

    it('should stop interval if bottom is less than original bottom', () => {
      spyOn(window, 'clearInterval');
      model.style = { bottom: '10' };
      model.originalBottom = '11';

      model.comeDown();
      jasmine.clock().tick(10);

      expect(clearInterval).toHaveBeenCalled();
      expect(model.isJumping).toBe(false);
    });

    it('should set style.bottom in the interval', () => {
      spyOn(window, 'clearInterval');
      model.style = { bottom: '10' };
      model.originalBottom = '0';

      model.comeDown();
      jasmine.clock().tick(10);

      expect(model.style.bottom).toBe('9%');
    });
  });

  describe('Jump', () => {
    beforeEach(() => {
      model = new MarioModel();
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should return if it is jumping', () => {
      model.isJumping = true;

      model.jump(10);

      expect(model.originalBottom).toBe(undefined);
    });

    it('should set originalBottom', () => {
      model.style = { bottom: '5%' };

      model.jump(10);
      jasmine.clock().tick(10);

      expect(model.originalBottom).toBe('5%');
      expect(model.style.bottom).toBe('6%');
    });

    it('should call clear interval and call comeDown at the end of jump', () => {
      model.style = { bottom: '5%' };
      spyOn(window, 'clearInterval');
      spyOn(model, 'comeDown');

      model.jump(5);
      jasmine.clock().tick(50);

      expect(clearInterval).toHaveBeenCalled();
      expect(model.comeDown).toHaveBeenCalled();
    });
  });
});
