import { AiProviderRepository } from '../repositories/ai-provider.repository.js';
import type { ArticleAnswer, ArticleInsights, ArticleInput } from '../types/insights.types.js';

const MAX_ARTICLE_LENGTH = 24000;

const articleText = (article: ArticleInput): string =>
    `Title: ${article.title}\n\nArticle:\n${article.content.slice(0, MAX_ARTICLE_LENGTH)}`;

const parseJson = <T>(value: string): T => {
    const cleaned = value.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    return JSON.parse(cleaned) as T;
};

export class InsightsService {
    constructor(private readonly provider: AiProviderRepository) { }

    async createInsights(article: ArticleInput): Promise<ArticleInsights> {
        const content = await this.provider.complete([
            { role: 'system', content: 'Return only valid JSON with summary (string), keyIdeas (array of 3 strings), and questions (array of 3 strings).' },
            { role: 'user', content: `Create concise reading insights for this article.\n\n${articleText(article)}` },
        ]);
        return parseJson<ArticleInsights>(content);
    }

    async answerQuestion(article: ArticleInput, question: string): Promise<ArticleAnswer> {
        const content = await this.provider.complete([
            { role: 'system', content: 'Answer only from the supplied article. If there is not enough information, say so. Return only valid JSON with answer (string).' },
            { role: 'user', content: `${articleText(article)}\n\nReader question: ${question}` },
        ]);
        return parseJson<ArticleAnswer>(content);
    }
}
