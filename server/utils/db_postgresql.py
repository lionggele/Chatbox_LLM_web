from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class EvaluationResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.String(100), nullable=False)  # Updated length for descriptive experiment_id
    context = db.Column(db.Text)
    question = db.Column(db.Text)
    correct_answer = db.Column(db.Text)
    llm_response = db.Column(db.Text)
    f1_score = db.Column(db.Float)
    bleu_score = db.Column(db.Float)

    def __repr__(self):
        return f"<EvaluationResult {self.id}>"

class ExperimentResult(db.Model):
    # __tablename__ = 'evaluation_result'
    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.String(100), unique=True, nullable=False)  # Updated length for descriptive experiment_id
    average_f1_score = db.Column(db.Float)
    average_bleu_score = db.Column(db.Float)


    def __repr__(self):
        return f"<ExperimentResult {self.experiment_id}>"
    





