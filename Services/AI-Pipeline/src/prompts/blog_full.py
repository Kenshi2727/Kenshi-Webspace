"""
Full blog generation prompt template.

Generates a complete blog post with structured sections from a topic.
"""


def get_blog_generation_prompt(
    topic: str,
    category: str | None = None,
    tone: str = "educational",
    target_length: str = "medium",
    keywords: list[str] | None = None,
) -> str:
    """Build the blog generation prompt."""

    length_guide = {
        "short": "approximately 500 words",
        "medium": "approximately 1000 words",
        "long": "approximately 2000 words",
    }

    word_target = length_guide.get(target_length, length_guide["medium"])
    keywords_section = f"\nKeywords to naturally incorporate: {', '.join(keywords)}" if keywords else ""
    category_section = f"\nCategory: {category}" if category else ""

    return f"""You are a professional blog writer for Kenshi Webspace, a modern content platform.

Write a complete, high-quality blog post on the following topic:

Topic: {topic}{category_section}
Tone: {tone}
Target length: {word_target}{keywords_section}

Requirements:
1. Write in clean Markdown format
2. Include a compelling introduction that hooks the reader
3. Use clear section headings (## and ###)
4. Include practical examples, code snippets, or real-world applications where relevant
5. Add a strong conclusion with key takeaways
6. Make the content engaging, informative, and original
7. Avoid filler content — every paragraph should add value
8. Use a {tone} writing tone throughout

Output the blog content in Markdown format only — no preamble or meta-commentary.
"""
