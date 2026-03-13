export interface NotificationDTO {
    to: string;
    subject: string;
    template: string;
    params: Record<string, any>;
}