"""
HuggingFace Inference API LLM Provider.

Fallback provider — uses HuggingFace's free Inference API.
Supports models like Mistral-7B-Instruct.
"""

from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint


class HuggingFaceProvider:
    """HuggingFace Inference API provider using LangChain integration."""

    def __init__(self, api_key: str, model: str = "mistralai/Mistral-7B-Instruct-v0.3"):
        self.name = f"huggingface/{model.split('/')[-1]}"
        self.endpoint = HuggingFaceEndpoint(
            repo_id=model,
            huggingfacehub_api_token=api_key,
            temperature=0.7,
            max_new_tokens=4096,
        )
        self.llm = ChatHuggingFace(llm=self.endpoint)

    async def invoke(self, prompt: str) -> str:
        """Send prompt to HuggingFace Inference API and return the response text."""
        response = await self.llm.ainvoke(prompt)
        return response.content
