"""
Tests for the LLM provider fallback chain.
"""

import pytest


def test_provider_chain_initialization():
    """Test that the provider chain initializes with available providers."""
    from src.llm.provider_chain import LLMProviderChain

    chain = LLMProviderChain()
    # At minimum, Ollama should always be registered
    assert len(chain.providers) >= 1
    assert any("ollama" in p.name for p in chain.providers)


def test_moderation_rules_loaded():
    """Test that moderation rules are properly defined."""
    from src.core.moderation_rules import get_moderation_rules

    rules = get_moderation_rules()
    assert len(rules) == 7

    # Check critical rules exist
    categories = [r["category"] for r in rules]
    assert "sexual_content" in categories
    assert "hate_speech" in categories
    assert "violence" in categories

    # Check all critical rules have reject action
    critical_rules = [r for r in rules if r["severity"] == "critical"]
    assert all(r["action"] == "reject" for r in critical_rules)
