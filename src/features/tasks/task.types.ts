import { Days } from '../../utils/date';

export enum TrackingType {
    Daily = 'daily',
    Weekly = 'weekly',
}

export interface TrackingOptions {
    dailyTrackingDays?: Days[]; // Days to track. For example, [1, 3, 5] means Monday, Wednesday, and Friday
    weeklyTrackingFrequency?: number; // Frequency of tracking in a week. For example, 2 means two times a week
}

export interface Task {
    id: string;
    title: string;
    completeHistory: string[];
    trackingType: TrackingType;
    trackingOptions: TrackingOptions;
}
