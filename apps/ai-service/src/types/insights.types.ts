export interface ArticleInput {
    id?: string | number;
    title: string;
    content: string;
}

export interface ArticleInsights {
    summary: string;
    keyIdeas: string[];
    questions: string[];
}

export interface ArticleAnswer {
    answer: string;
}

export interface ArticleDiagram {
    mermaid: string;
}

export interface NetworkArticleInput {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
}

export interface ArticleTopicCluster {
    name: string;
    description: string;
    articleIds: string[];
}

export interface RelatedArticlePair {
    sourceId: string;
    targetId: string;
    reason: string;
}

export interface ArticleNetwork {
    topics: ArticleTopicCluster[];
    relatedArticles: RelatedArticlePair[];
    summary: string;
}
