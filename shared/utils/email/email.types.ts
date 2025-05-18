export interface SubscriptionConfirmationContext {
  email: string;
  city: string;
  frequency: string;
  confirmationLink: string;
}

export interface WeatherNotificationContext {
  email: string;
  city: string;
  frequency: string;
  weather: {
    temperature: number;
    description: string;
    humidity: number;
  };
  unsubscribeLink: string;
}
