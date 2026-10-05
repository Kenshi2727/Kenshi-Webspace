import { tool } from 'langchain';
import { z } from 'zod';
import type { ArticleInput } from '../types/insights.types.js';

export const createArticleContextTool = (article: ArticleInput) => tool(
    () => [
        `Article title: ${article.title}`,
        `Article id: ${article.id ?? 'unknown'}`,
        'Complete article body:',
        article.content,
    ].join('\n\n'),
    {
        name: 'article_context',
        description: 'Provides the complete article title and body for grounded analysis. Call this before answering.',
        schema: z.object({}),
    },
);
