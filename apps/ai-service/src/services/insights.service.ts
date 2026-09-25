import { createAgent } from 'langchain';
import { env } from '../config/env.js';
import { createArticleContextTool } from '../tools/article-context.tool.js';
import type { ArticleAnswer, ArticleInsights, ArticleInput } from '../types/insights.types.js';

const parseJson = <T>(value: string): T => {
    const cleaned = value.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    return JSON.parse(cleaned) as T;
};

export class InsightsService {
    async createInsights(article: ArticleInput): Promise<ArticleInsights> {
        const content = await this.askAgent(article, 'Create article insights. Return only JSON with summary as a string, keyIdeas as exactly 3 concise strings, and questions as exactly 3 useful reader questions.');
        return parseJson<ArticleInsights>(content);
    }

    async answerQuestion(article: ArticleInput, question: string): Promise<ArticleAnswer> {
        const content = await this.askAgent(article, `Answer this reader question using only the article: ${question}`);
        return parseJson<ArticleAnswer>(content);
    }

    private async askAgent(article: ArticleInput, request: string): Promise<string> {
        const agent = createAgent({
            model: env.aiModel,
            tools: [createArticleContextTool(article)],
        });
        const result = await agent.invoke({
            messages: [
                {
                    role: 'system',
                    content: 'You are an article reading assistant. Always call article_context first. Use only that article. Return only valid JSON.',
                },
                { role: 'user', content: request },
            ],
        });
        const message = result.messages.at(-1);
        if (!message) throw new Error('AI agent returned no message');
        return typeof message.content === 'string'
            ? message.content
            : message.content.map((part) => typeof part === 'string' ? part : 'text' in part ? part.text : '').join('');
    }
}
