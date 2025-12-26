export type Language = 'Odia' | 'Hindi';

export interface VideoJobPayload {
    storyId: string;
    language: Language;
    topic: string;
}

export interface VoiceJobPayload {
    storyId: string;
    script: string;
}

export interface PublishJobPayload {
    videoId: string;
    platform: 'YOUTUBE';
}
