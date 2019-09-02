export interface Client{
    engine: string;
    engineVersion: string; 
	name: string;
	type: string;
	version:  string;
}

export interface Device{
    brand: string;
	model: string;
	type: string;
}

export interface Os{
    name: string;
    platform: string;
    version: string;
}

export interface DeviceInfo{
    client: Client;
    device: Device;
    os: Os;
}