"""Add experiment_id column to EvaluationResult table

Revision ID: d357c8dc245c
Revises: 
Create Date: 2024-10-21 16:10:26.929572

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'd357c8dc245c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('evaluation_result', schema=None) as batch_op:
        batch_op.add_column(sa.Column('experiment_id', sa.String(length=100), nullable=False))
        batch_op.drop_column('created_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('evaluation_result', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
        batch_op.drop_column('experiment_id')

    # ### end Alembic commands ###