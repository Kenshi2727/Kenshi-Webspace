"""
Content review & moderation prompt template.

Evaluates blog content against moderation policies and quality standards.
"""


def get_content_review_prompt(
    title: str,
    content: str,
    category: str | None,
    rules: list[dict],
) -> str:
    """Build the content review prompt with moderation rules."""

    # Format rules into the prompt
    rules_text = "\n".join(
        f"  - **{rule['label']}** (severity: {rule['severity']}, action: {rule['action']}): {rule['description']}"
        for rule in rules
    )

    # Truncate content if very long
    content_preview = content[:5000] if len(content) > 5000 else content

    return f"""You are a content moderator and quality reviewer for Kenshi Webspace.

Review the following blog post against our content policy and quality standards.

## Blog Post
Title: {title}
Category: {category or "Not specified"}

Content:
{content_preview}

## Content Policy Rules
{rules_text}

## Your Task
Evaluate this blog post and provide a structured review:

1. **Verdict**: "approve" (safe and good quality), "reject" (policy violation), or "needs_review" (borderline or quality concerns)
2. **Quality Score**: 0-100 based on writing quality, depth, originality, and value
3. **Violations**: List any content policy violations found, with:
   - Category name
   - Severity (critical/high/medium/low)
   - The specific excerpt that violates the policy
   - Explanation of why it's a violation
4. **Suggestions**: Actionable improvements for the author
5. **Readability Score**: 0-100 based on clarity, structure, and accessibility
6. **SEO Score**: 0-100 based on keyword usage, heading structure, and meta-friendliness

Important rules:
- Be strict on critical violations (sexual content, hate speech, violence) — always reject
- Be fair but constructive on quality — provide helpful suggestions
- Consider context — technical jargon is fine in tech articles
- Flag, don't reject, borderline quality issues

Respond in valid JSON format with this structure:
{{
  "verdict": "approve|reject|needs_review",
  "score": 0-100,
  "violations": [
    {{
      "category": "category_name",
      "severity": "critical|high|medium|low",
      "excerpt": "problematic text",
      "explanation": "why this is a violation"
    }}
  ],
  "suggestions": ["suggestion 1", "suggestion 2"],
  "readability_score": 0-100,
  "seo_score": 0-100
}}
"""
