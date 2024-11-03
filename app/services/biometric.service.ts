import { BiometricAuth } from '@nativescript/biometrics';

export class BiometricService {
  private biometricAuth: BiometricAuth;

  constructor() {
    this.biometricAuth = new BiometricAuth();
  }

  async isAvailable(): Promise<boolean> {
    const result = await this.biometricAuth.available();
    return result.biometrics;
  }

  async authenticate(): Promise<boolean> {
    try {
      const result = await this.biometricAuth.verifyFingerprint({
        title: 'Attendance Verification',
        message: 'Verify your identity to record attendance',
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use Backup'
      });
      return result.code === 0;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  }
}