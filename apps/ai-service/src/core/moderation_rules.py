"""
Content Moderation Rules.

Defines the content policy for the Kenshi Webspace platform.
These rules are passed to the AI reviewer as evaluation criteria.
"""


MODERATION_RULES = [
    {
        "category": "sexual_content",
        "label": "Sexual Content",
        "description": "Explicit or suggestive sexual content, pornographic material, or sexually exploitative content",
        "severity": "critical",
        "action": "reject",
    },
    {
        "category": "hate_speech",
        "label": "Hate Speech & Racism",
        "description": "Content promoting hatred, discrimination, or prejudice against individuals or groups based on race, ethnicity, religion, gender, sexual orientation, disability, or nationality",
        "severity": "critical",
        "action": "reject",
    },
    {
        "category": "violence",
        "label": "Violence & Harm",
        "description": "Graphic descriptions of violence, glorification of harm, instructions for causing injury, or content promoting self-harm",
        "severity": "critical",
        "action": "reject",
    },
    {
        "category": "misinformation",
        "label": "Misinformation",
        "description": "Demonstrably false claims presented as fact, conspiracy theories stated as truth, or misleading health/safety information",
        "severity": "high",
        "action": "flag",
    },
    {
        "category": "spam_low_quality",
        "label": "Spam / Low Quality",
        "description": "Keyword stuffing, meaningless or incoherent content, auto-generated gibberish, or clickbait without substance",
        "severity": "high",
        "action": "flag",
    },
    {
        "category": "plagiarism",
        "label": "Plagiarism Indicators",
        "description": "Suspiciously generic or template-like content that appears to be directly copied without attribution or original thought",
        "severity": "medium",
        "action": "flag",
    },
    {
        "category": "personal_data",
        "label": "Personal Data Exposure",
        "description": "Content exposing personal information such as phone numbers, email addresses, physical addresses, social security numbers, or financial details",
        "severity": "medium",
        "action": "flag",
    },
]


def get_moderation_rules() -> list[dict]:
    """Return the current moderation rules."""
    return MODERATION_RULES
