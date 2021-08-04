import { MarioEnemy } from './mario-enemy.model';
import { ElementStyle } from './element-style.model';

describe('MarioEnemy', () => {
  let component;
  beforeEach(() => {
    component = new MarioEnemy();
  });

  it('should initial style with an empty object', () => {
    expect(component.style).toEqual({} as ElementStyle);
  });
});
