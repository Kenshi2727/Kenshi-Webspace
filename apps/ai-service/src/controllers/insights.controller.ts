import type { Request, Response } from 'express';
import { InsightsService } from '../services/insights.service.js';
import type { ArticleInput, NetworkArticleInput } from '../types/insights.types.js';

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

const validateNetworkArticles = (articles: unknown): NetworkArticleInput[] => {
    if (!Array.isArray(articles) || articles.length === 0 || articles.length > 40) {
        throw new Error('articles must contain between 1 and 40 published articles');
    }

    const validated = articles.map((article, index) => {
        if (!article || typeof article !== 'object') throw new Error(`articles[${index}] is invalid`);
        const candidate = article as Partial<NetworkArticleInput>;
        if (
            typeof candidate.id !== 'string' || !candidate.id.trim() || candidate.id.length > 100 ||
            typeof candidate.title !== 'string' || !candidate.title.trim() || candidate.title.length > 180 ||
            typeof candidate.excerpt !== 'string' || candidate.excerpt.length > 600 ||
            typeof candidate.category !== 'string' || candidate.category.length > 80 ||
            typeof candidate.publishedAt !== 'string' || !Number.isFinite(Date.parse(candidate.publishedAt))
        ) {
            throw new Error(`articles[${index}] must include a valid id, title, excerpt, and category`);
        }
        return {
            id: candidate.id,
            title: candidate.title.trim(),
            excerpt: candidate.excerpt.trim(),
            category: candidate.category.trim(),
            publishedAt: candidate.publishedAt,
        };
    });

    if (new Set(validated.map((article) => article.id)).size !== validated.length) {
        throw new Error('article IDs must be unique');
    }
    return validated;
};

export const createInsightsController = (service: InsightsService) => ({
    createInsights: async (req: Request, res: Response): Promise<void> => {
        try {
            const insights = await service.createInsights(validateArticle(req.body?.article));
            res.status(200).json({ success: true, data: insights });
        } catch (error) {
            res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Unable to create insights' });
        }
    },

    answerQuestion: async (req: Request, res: Response): Promise<void> => {
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
    },

    createDiagram: async (req: Request, res: Response): Promise<void> => {
        try {
            const diagram = await service.createDiagram(validateArticle(req.body?.article));
            res.status(200).json({ success: true, data: diagram });
        } catch (error) {
            res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Unable to create diagram' });
        }
    },

    createArticleNetwork: async (req: Request, res: Response): Promise<void> => {
        try {
            const articles = validateNetworkArticles(req.body?.articles);
            const network = await service.createArticleNetwork(articles);
            res.status(200).json({ success: true, data: network });
        } catch (error) {
            res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Unable to analyze article network' });
        }
    },
});


