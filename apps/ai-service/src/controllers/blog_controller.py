"""
Blog generation controller.

Orchestrates the blog generation pipeline — receives validated requests
from the API layer and coordinates with core services.
"""

from src.models.blog import BlogRequest, BlogDraft, TitleRequest, ExcerptRequest
from src.core.blog_generator import BlogGenerator
from src.utils.logger import logger

blog_generator = BlogGenerator()


async def handle_generate_blog(request: BlogRequest) -> BlogDraft:
    """Generate a complete blog draft from a topic."""
    logger.info(f"Generating blog for topic: {request.topic}")

    draft = await blog_generator.generate(request)

    logger.info(f"Blog generated successfully | model={draft.model_used} | time={draft.generation_time_ms}ms")
    return draft


async def handle_generate_titles(request: TitleRequest) -> dict:
    """Generate title suggestions for a topic."""
    logger.info(f"Generating titles for topic: {request.topic}")

    titles = await blog_generator.generate_titles(request.topic, request.count)

    return {"topic": request.topic, "titles": titles}


async def handle_generate_excerpt(request: ExcerptRequest) -> dict:
    """Generate an excerpt from blog content."""
    logger.info("Generating excerpt from content")

    excerpt = await blog_generator.generate_excerpt(request.content, request.max_length)

    return {"excerpt": excerpt}
