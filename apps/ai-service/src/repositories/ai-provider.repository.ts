import { env } from '../config/env.js';

interface ChatMessage {
    role: 'system' | 'user';
    content: string;
}

export class AiProviderRepository {
    async complete(messages: ChatMessage[]): Promise<string> {
        const systemMessage = messages.find((message) => message.role === 'system');
        const contents = messages
            .filter((message) => message.role !== 'system')
            .map((message) => ({
                role: 'user',
                parts: [{ text: message.content }],
            }));

        const endpoint = `${env.geminiApiUrl}/models/${env.geminiModel}:generateContent?key=${encodeURIComponent(env.geminiApiKey())}`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                systemInstruction: systemMessage
                    ? { parts: [{ text: systemMessage.content }] }
                    : undefined,
                contents,
                generationConfig: {
                    temperature: 0.2,
                    responseMimeType: 'application/json',
                },
            }),
        });

        if (!response.ok) {
            const detail = await response.text();
            throw new Error(`AI provider request failed (${response.status}): ${detail.slice(0, 300)}`);
        }

        const payload = await response.json() as {
            candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };
        const content = payload.candidates?.[0]?.content?.parts
            ?.map((part) => part.text ?? '')
            .join('')
            .trim();

        if (!content) {
            throw new Error('AI provider returned an empty response');
        }

        return content;
    }
}
