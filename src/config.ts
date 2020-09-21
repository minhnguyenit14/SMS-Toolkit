import DeviceInfo from 'react-native-device-info';

const config = {
  version: DeviceInfo.getVersion(),
  asyncStorageKey: '423buv290vfui_fi38mimo',
  retryInterval: 30 * 1000,
  colors: {
    background: '#fafafa',
    primary: '#f2dc5b',
    status: {
      primary: '#36629f',
      success: '#63a338',
      danger: '#e03b24',
      warning: '#ffcc01',
      disabled: '#d9d9d9',
      cancel: '#bbb',
    },
    logo: {
      main: '#f2dc5b',
      sub1: '#f59354',
      sub2: '#2a60a0',
      sub3: '#76afa0',
      background: '#5f02c7',
    },
  },
};

export default Object.freeze(config);
