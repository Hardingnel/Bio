import { Observable } from '@nativescript/core';

export interface AttendanceRecord {
  timestamp: Date;
  type: 'check-in' | 'check-out';
}

export class AttendanceModel extends Observable {
  private records: AttendanceRecord[] = [];

  constructor() {
    super();
  }

  addRecord(type: 'check-in' | 'check-out'): void {
    this.records.push({
      timestamp: new Date(),
      type
    });
    this.notifyPropertyChange('records', this.records);
  }

  getRecords(): AttendanceRecord[] {
    return [...this.records];
  }
}