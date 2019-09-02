import DeviceDetector from 'device-detector-js';
import { DeviceInfo, Client, Device, Os } from '../models/DeviceInfo';

export const DetectorDevice = () => {
  const client: Client = {
    engine: '',
    engineVersion: '',
    name: '',
    type: '',
    version: ''
  };

  const device: Device = {
    brand: '',
    model: '',
    type: ''
  };

  const os: Os = {
    name: '',
    platform: '',
    version: ''
  };

  const deviceInfo: DeviceInfo = {
    client: client,
    device: device,
    os: os
  };

    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;
    const device2: any = deviceDetector.parse(userAgent);

    deviceInfo.client = device2.client;
    deviceInfo.device = device2.device;
    deviceInfo.os = device2.os;   
     
    return deviceInfo;
  };
  