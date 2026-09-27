import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createAgent, toolStrategy } from 'langchain';
import { z } from 'zod';
import { env } from '../config/env.js';
import { createArticleContextTool } from '../tools/article-context.tool.js';
import type { ArticleAnswer, ArticleInsights, ArticleInput } from '../types/insights.types.js';

const insightsSchema = z.object({
    summary: z.string(),
    keyIdeas: z.array(z.string()).length(3),
    questions: z.array(z.string()).length(3),
}).strict();

const answerSchema = z.object({
    answer: z.string(),
}).strict();

const responsePrompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are an article reading assistant. Always call article_context first and use only that article. Return a structured response matching the required JSON schema exactly.'],
    ['human', '{request}'],
]);

export class InsightsService {
    async createInsights(article: ArticleInput): Promise<ArticleInsights> {
        return this.askAgent(
            article,
            'Create article insights: provide a concise summary, exactly 3 concise key ideas, and exactly 3 useful reader questions.',
            insightsSchema,
        );
    }

    async answerQuestion(article: ArticleInput, question: string): Promise<ArticleAnswer> {
        return this.askAgent(
            article,
            `Answer this reader question using only the article: ${question}. Return exactly one JSON field named "answer" containing the response text. Do not use "explanation" or any other field.`,
            answerSchema,
        );
    }

    private async askAgent<T extends Record<string, unknown>>(article: ArticleInput, request: string, schema: z.ZodType<T>): Promise<T> {
        const agent = createAgent({
            model: env.aiModel,
            tools: [createArticleContextTool(article)],
            responseFormat: toolStrategy(schema),
        });
        const messages = await responsePrompt.formatMessages({ request });
        const result = await agent.invoke({
            messages,
        });
        const structuredResponse = (result as typeof result & { structuredResponse?: unknown }).structuredResponse;
        if (!structuredResponse) throw new Error('AI agent returned no structured response');
        const response = schema.parse(structuredResponse);
        console.log('AI agent response:', JSON.stringify(response));
        return response;
    }
}
