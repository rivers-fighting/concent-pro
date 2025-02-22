import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import { getRef, SettingsType } from 'concent';
import Header, { SettingPanel, setup } from '../Header';
import { CtxM } from 'types/store';

type Ctx = CtxM<{}, '$$default', SettingsType<typeof setup>>;
// 组件实例
let ins = null as unknown as ReactWrapper;
let insPanel = null as unknown as ReactWrapper;
let ref = null as unknown as { ctx: Ctx };

/**
 * @author fancyzhong
 * @priority P0
 * @casetype unit
 */
describe('Header Render', () => {
  beforeAll(() => {
    ins = mount(<Header />);
    insPanel = mount(<SettingPanel />);

    const insC2Ref = getRef<Ctx>({ moduleName: '$$default', tag: 'SettingPanel' });
    if (!insC2Ref) {
      throw new Error('you may forget add tag for component');
    }
    ref = insC2Ref;
  });

  test('generate Header snapshot', () => {
    expect(toJson(ins)).toMatchSnapshot();
  });

  test('generate SettingPanel snapshot', () => {
    expect(toJson(insPanel)).toMatchSnapshot();
  });

  test('test dom architecture', () => {
    const insSettingPanel = ins.find(SettingPanel);
    expect(insSettingPanel).toBeTruthy();
  });

  test('call setup', () => {
    const se = ref.ctx.settings;
    console.log(se);
    expect(se.onHeaderThemeChange({} as any)).toBeFalsy();
    expect(se.onSiderThemeChange({} as any)).toBeFalsy();
    expect(se.onWebsiteColorChange({} as any)).toBeFalsy();
    expect(se.onFixHeaderChange({} as any)).toBeFalsy();
    expect(se.onInnerMockChange({} as any)).toBeFalsy();
  });
});
