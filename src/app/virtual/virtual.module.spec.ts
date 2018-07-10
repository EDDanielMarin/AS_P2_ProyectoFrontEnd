import { VirtualModule } from './virtual.module';

describe('VirtualModule', () => {
  let virtualModule: VirtualModule;

  beforeEach(() => {
    virtualModule = new VirtualModule();
  });

  it('should create an instance', () => {
    expect(virtualModule).toBeTruthy();
  });
});
