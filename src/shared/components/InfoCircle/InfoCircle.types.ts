export enum InfoCircleVariant {
  Info = 'Info',
  NotOwned = 'NotOwned',
  ToUpcycle = 'ToUpcycle',
}

export interface InfoCircleProps {
  variant: InfoCircleVariant;
  title?: string;
}
