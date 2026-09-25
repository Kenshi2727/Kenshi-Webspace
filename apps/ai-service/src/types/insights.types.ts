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
