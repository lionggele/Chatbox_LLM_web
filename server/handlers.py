# All different LLM model API handler
class LLMHandler:
    def query(self, text):
        raise NotImplementedError("Subclasses should implement this method.")

class OpenAIHandler(LLMHandler):
    def query(self, text):
        # Code to make the API request to OpenAI
        return {"response": f"OpenAI says: {text}"}

class BardHandler(LLMHandler):
    def query(self, text):
        # Code to make the API request to Google Bard
        return {"response": f"Bard says: {text}"}

class PaLM2Handler(LLMHandler):
    def query(self, text):
        # Code to make the API request to PaLM 2
        return {"response": f"PaLM2 says: {text}"}


def get_handler(model_name):
    if model_name == 'openai':
        return OpenAIHandler()
    elif model_name == 'bard':
        return BardHandler()
    elif model_name == 'palm2':
        return PaLM2Handler()
    else:
        raise ValueError("Invalid model name provided")



# hugging faces!!