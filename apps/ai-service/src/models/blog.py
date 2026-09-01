"""
Blog generation Pydantic models.

Defines request/response schemas for blog generation endpoints.
Maps to the Post model in the Kenshi Webspace Prisma schema.
"""

from pydantic import BaseModel, Field


class BlogRequest(BaseModel):
    """Request schema for generating a complete blog draft."""

    topic: str = Field(..., description="The blog topic or prompt", min_length=3)
    category: str | None = Field(None, description="Blog category (e.g., Technology, Design)")
    tone: str = Field("educational", description="Writing tone: educational, casual, professional, storytelling")
    target_length: str = Field("medium", description="Target length: short (~500 words), medium (~1000), long (~2000)")
    keywords: list[str] = Field(default_factory=list, description="SEO keywords to incorporate")
    generate_cover_image: bool = Field(False, description="Whether to also generate a cover image")


class BlogDraft(BaseModel):
    """
    Response schema for a generated blog draft.

    Fields map to the Post model in Prisma:
      title       → Post.title
      excerpt     → Post.excerpt
      category    → Post.category
      content     → Post.content (markdown)
      read_time   → Post.readTime
    """

    title: str = Field(..., description="Generated blog title")
    excerpt: str = Field("", description="Short excerpt/summary (~150 chars)")
    category: str = Field("General", description="Blog category")
    content: str = Field(..., description="Full blog content in markdown")
    read_time: int = Field(..., description="Estimated read time in minutes")
    suggested_titles: list[str] = Field(default_factory=list, description="Alternative title suggestions")
    seo_keywords: list[str] = Field(default_factory=list, description="SEO keywords extracted from content")
    cover_image_url: str | None = Field(None, description="Generated cover image URL (if requested)")
    cover_image_prompt: str | None = Field(None, description="Prompt used for cover image generation")
    model_used: str = Field(..., description="LLM model that generated the content")
    generation_time_ms: int = Field(..., description="Total generation time in milliseconds")


class TitleRequest(BaseModel):
    """Request schema for generating title suggestions."""

    topic: str = Field(..., description="Topic to generate titles for", min_length=3)
    count: int = Field(5, description="Number of title suggestions", ge=1, le=10)


class ExcerptRequest(BaseModel):
    """Request schema for generating an excerpt from content."""

    content: str = Field(..., description="Blog content to summarize", min_length=10)
    max_length: int = Field(160, description="Maximum excerpt length in characters", ge=50, le=300)
