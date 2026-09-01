"""
Blog Generation Pipeline.

Orchestrates the full blog creation process:
  Topic → Outline → Full Content → Titles → Excerpt → SEO Keywords

Uses the LLM provider chain for intelligent model fallback.
"""

import time
from src.models.blog import BlogRequest, BlogDraft
from src.llm.provider_chain import LLMProviderChain
from src.prompts.blog_full import get_blog_generation_prompt
from src.prompts.blog_title import get_title_generation_prompt
from src.prompts.blog_excerpt import get_excerpt_generation_prompt
from src.utils.logger import logger


class BlogGenerator:
    """Generates blog content using LLM provider chain with fallback."""

    def __init__(self):
        self.llm_chain = LLMProviderChain()

    async def generate(self, request: BlogRequest) -> BlogDraft:
        """
        Generate a complete blog draft from a topic.

        Pipeline: Topic → Full content → Titles → Excerpt → Read time → SEO
        """
        start_time = time.time()

        # Build the generation prompt
        prompt = get_blog_generation_prompt(
            topic=request.topic,
            category=request.category,
            tone=request.tone,
            target_length=request.target_length,
            keywords=request.keywords,
        )

        # Call LLM with fallback chain
        response, model_used = await self.llm_chain.invoke(prompt)

        # Parse the structured response
        # TODO: Implement structured output parsing with LangChain
        # For now, return the raw content as the blog body
        content = response

        # Calculate read time (average reading speed: ~200 words/min)
        word_count = len(content.split())
        read_time = max(1, round(word_count / 200))

        elapsed_ms = int((time.time() - start_time) * 1000)

        draft = BlogDraft(
            title=request.topic,  # TODO: Extract from structured LLM output
            excerpt="",  # TODO: Generate from content
            category=request.category or "General",
            content=content,
            read_time=read_time,
            suggested_titles=[],  # TODO: Generate multiple title options
            seo_keywords=request.keywords or [],
            cover_image_url=None,
            cover_image_prompt=None,
            model_used=model_used,
            generation_time_ms=elapsed_ms,
        )

        logger.info(f"Blog draft generated | words={word_count} | readTime={read_time}min")
        return draft

    async def generate_titles(self, topic: str, count: int = 5) -> list[str]:
        """Generate title suggestions for a given topic."""
        prompt = get_title_generation_prompt(topic, count)
        response, _ = await self.llm_chain.invoke(prompt)

        # TODO: Parse structured title list from LLM response
        return [response]

    async def generate_excerpt(self, content: str, max_length: int = 160) -> str:
        """Generate an excerpt/summary from blog content."""
        prompt = get_excerpt_generation_prompt(content, max_length)
        response, _ = await self.llm_chain.invoke(prompt)

        return response[:max_length]
