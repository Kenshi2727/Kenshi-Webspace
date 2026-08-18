"""
Image prompt generation template.

Generates optimized prompts for image generation models
based on a blog topic or description.
"""


def get_image_prompt_template(topic: str, style: str = "blog_cover") -> str:
    """Generate an optimized image generation prompt from a blog topic."""

    style_guides = {
        "blog_cover": "modern, clean, professional blog cover illustration with subtle gradients",
        "illustration": "detailed digital illustration with vibrant colors",
        "photo": "high-quality photorealistic stock photo style",
        "minimalist": "minimalist flat design with geometric shapes and muted colors",
        "tech": "futuristic technology themed with circuit patterns and glowing elements",
    }

    style_desc = style_guides.get(style, style_guides["blog_cover"])

    return f"""Create a {style_desc} that represents the concept of: {topic}.

The image should:
- Be visually striking and professional
- Work well as a blog header/cover image
- Not contain any text or words
- Have a clean composition with good visual hierarchy
- Use a harmonious color palette
"""
