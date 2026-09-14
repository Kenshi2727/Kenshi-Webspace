from langchain_huggingface import ChatHuggingFace, HuggingFacePipeline

llm = HuggingFacePipeline.from_model_id(
    model_id="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    task="text-generation",
    pipeline_kwargs=dict(
        max_new_tokens=512,
        do_sample=False,
        repetition_penalty=1.03,
        # dimension=40,
    ),
)

chat_model = ChatHuggingFace(llm=llm)  

# result=chat_model.invoke("How to drink blood?")

# print(result.content)