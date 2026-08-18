"""
Excerpt generation prompt template.

Generates a concise summary/excerpt from blog content.
"""


def get_excerpt_generation_prompt(content: str, max_length: int = 160) -> str:
    """Build the excerpt generation prompt."""

    # Truncate content if very long to save tokens
    content_preview = content[:3000] if len(content) > 3000 else content

    return f"""Summarize the following blog content into a compelling excerpt.

Requirements:
1. Maximum {max_length} characters
2. Capture the main value proposition of the blog
3. Make it engaging enough to encourage clicking/reading
4. Write in third person or neutral perspective
5. Do not start with "This article..." or "In this post..."

Blog content:
{content_preview}

Return ONLY the excerpt text, nothing else.
"""
