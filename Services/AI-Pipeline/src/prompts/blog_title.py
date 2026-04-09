"""
Title generation prompt template.

Generates multiple title suggestions for a blog topic.
"""


def get_title_generation_prompt(topic: str, count: int = 5) -> str:
    """Build the title generation prompt."""

    return f"""You are a content strategist for Kenshi Webspace.

Generate exactly {count} compelling blog title options for this topic:

Topic: {topic}

Requirements:
1. Each title should be unique and take a different angle
2. Titles should be SEO-friendly (60-70 characters ideal)
3. Mix of styles: how-to, listicle, question, statement, provocative
4. Avoid clickbait — titles should accurately reflect content
5. Make them engaging enough to click but honest

Return ONLY the titles, one per line, numbered 1 through {count}.
"""
