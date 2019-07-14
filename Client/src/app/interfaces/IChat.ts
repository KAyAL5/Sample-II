export interface IChatGroup  {
    id: string;
    displayName: string;
    type: 'single' | 'group' | 'room';
    message: string;
    createdAt: string;
    isMe: boolean;
    token?: string;
}