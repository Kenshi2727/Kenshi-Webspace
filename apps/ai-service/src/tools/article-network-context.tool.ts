import { tool } from 'langchain';
import { z } from 'zod';
import type { NetworkArticleInput } from '../types/insights.types.js';

export const createArticleNetworkContextTool = (articles: NetworkArticleInput[]) => tool(
    () => JSON.stringify({ publishedArticles: articles }),
    {
        name: 'published_article_context',
        description: 'Returns the supplied published Kenshi articles. Use only these article IDs when building topic clusters and related-article links.',
        schema: z.object({}),
    },
);