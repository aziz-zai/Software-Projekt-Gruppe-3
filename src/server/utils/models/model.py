from dataclasses import dataclass


@dataclass
class TableObj:
    """Base table format. Each table should contain an auto-incremented id."""

    id: int


class Model(TableObj):
    """Basic model instance."""

    table_obj = TableObj

    @property
    def __tablename__(self):
        """Tablename of model."""
        raise Exception("Tablename is required")

    def __repr__(self) -> str:
        return f'<{self.__class__.__name__} {self.instance.id}>'
