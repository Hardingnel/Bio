import { Observable } from '@nativescript/core';
import { BiometricService } from './services/biometric.service';
import { AttendanceModel, AttendanceRecord } from './models/attendance';

export class AttendanceViewModel extends Observable {
  private biometricService: BiometricService;
  private attendanceModel: AttendanceModel;
  private _lastAction: string = 'Welcome! Please record your attendance.';
  private _records: AttendanceRecord[] = [];

  constructor() {
    super();
    this.biometricService = new BiometricService();
    this.attendanceModel = new AttendanceModel();
  }

  get lastAction(): string {
    return this._lastAction;
  }

  set lastAction(value: string) {
    if (this._lastAction !== value) {
      this._lastAction = value;
      this.notifyPropertyChange('lastAction', value);
    }
  }

  get records(): AttendanceRecord[] {
    return this._records;
  }

  set records(value: AttendanceRecord[]) {
    if (this._records !== value) {
      this._records = value;
      this.notifyPropertyChange('records', value);
    }
  }

  async onCheckIn() {
    await this.recordAttendance('check-in');
  }

  async onCheckOut() {
    await this.recordAttendance('check-out');
  }

  private async recordAttendance(type: 'check-in' | 'check-out') {
    try {
      const isAvailable = await this.biometricService.isAvailable();
      if (!isAvailable) {
        this.lastAction = 'Biometric authentication is not available';
        return;
      }

      const authenticated = await this.biometricService.authenticate();
      if (authenticated) {
        this.attendanceModel.addRecord(type);
        this.records = this.attendanceModel.getRecords();
        this.lastAction = `Successfully recorded ${type} at ${new Date().toLocaleTimeString()}`;
      } else {
        this.lastAction = 'Authentication failed. Please try again.';
      }
    } catch (error) {
      console.error('Error recording attendance:', error);
      this.lastAction = 'An error occurred. Please try again.';
    }
  }
}