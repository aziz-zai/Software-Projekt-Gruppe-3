from dataclasses import dataclass


@dataclass
class BusinessObj:
    """Base table format. Each table should contain an auto-incremented id."""

    id: int


class Model(BusinessObj):
    """Basic model instance."""

    business_obj = BusinessObj

    @property
    def __tablename__(self):
        """Tablename of model."""
        raise Exception("Tablename is required")

    def __repr__(self) -> str:
        return f'<{self.__class__.__name__} {self.instance.id}>'
