export enum NotificationType {
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
}

export interface INotification {
  id: number;
  title: string;
  description: string;
  type: NotificationType;
}
