import type { TurboModule, CodegenTypes } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type NativeEventPayload = {
  name: string;
  data: Object;
};

export interface Spec extends TurboModule {
  getPhoneNumber(): string;
  getDeviceId(): Promise<string>;
  readonly onNativeEvent: CodegenTypes.EventEmitter<NativeEventPayload>;
}

// Using get (not getEnforcing) so the app doesn't hard crash
// if the native module hasn't been registered yet.
export default TurboModuleRegistry.get<Spec>('NativeUserModule');
