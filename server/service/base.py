# A registry to store different chatbot engines
BOT_REGISTRY = {}

class EngineResponse:
    """Dataclass to standardize response format from engines."""
    def __init__(self, text: str = ""):
        self.text = text

class BaseEngine:
    """
    Base class for all chatbot engines.
    Child classes must implement the `send` method.
    This class automatically registers child engines to the `BOT_REGISTRY`.
    """
    NAME = ""
    DISPLAY_NAME = ""

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        assert cls.NAME, "Child class must define a NAME."
        assert cls.DISPLAY_NAME, "Child class must define a DISPLAY_NAME."
        BOT_REGISTRY[cls.NAME] = cls

    def send(self, message: str) -> EngineResponse:
        

        raise NotImplementedError("Child classes must implement `send` method.")
