def calculate_average_score(answer_documents: list):

    if not answer_documents:
        return 0

    total_score = sum(
        answer.get("score", 0)
        for answer in answer_documents
    )

    average_score = total_score / len(answer_documents)

    return round(average_score, 2)


def calculate_overall_score(answer_documents: list):

    average_score = calculate_average_score(
        answer_documents
    )

    overall_score = average_score * 10

    return round(overall_score, 2)


def extract_difficulty_progression(answer_documents: list):

    difficulties = []

    for answer in answer_documents:
        difficulties.append(
            answer.get("difficulty_assigned", "unknown")
        )

    return difficulties