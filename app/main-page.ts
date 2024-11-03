import { EventData, Page } from '@nativescript/core';
import { AttendanceViewModel } from './main-view-model';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new AttendanceViewModel();
}