import type { Request, Response } from 'express';
import { AiProviderRepository } from '../repositories/ai-provider.repository.js';
import { InsightsService } from '../services/insights.service.js';
import type { ArticleInput } from '../types/insights.types.js';

const service = new InsightsService(new AiProviderRepository());

const validateArticle = (article: unknown): ArticleInput => {
    if (!article || typeof article !== 'object') {
        throw new Error('article is required');
    }

    const candidate = article as Partial<ArticleInput>;
    if (typeof candidate.title !== 'string' || typeof candidate.content !== 'string') {
        throw new Error('article.title and article.content are required strings');
    }

    return candidate as ArticleInput;
};

export const createInsights = async (req: Request, res: Response): Promise<void> => {
    try {
        const insights = await service.createInsights(validateArticle(req.body?.article));
        res.status(200).json({ success: true, data: insights });
    } catch (error) {
        res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Unable to create insights' });
    }
};

export const answerQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = validateArticle(req.body?.article);
        const question = req.body?.question;
        if (typeof question !== 'string' || !question.trim()) {
            throw new Error('question is required');
        }

        const answer = await service.answerQuestion(article, question.trim());
        res.status(200).json({ success: true, data: answer });
    } catch (error) {
        res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Unable to answer question' });
    }
};
