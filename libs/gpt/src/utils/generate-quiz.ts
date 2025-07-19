export const generateQuiz = {
  type: 'function',
  function: {
    name: 'generate_quiz',
    description:
      'Generate a quiz with questions and answers. Each question must have exactly 4 answers with scores from 0 to 100.',
    parameters: {
      type: 'object',
      properties: {
        quiz: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              question: {
                type: 'string',
                description: 'The question text',
              },
              complexity: {
                type: 'number',
                description: 'Question complexity from 1 to 10',
              },
              order: {
                type: 'number',
                description: 'Question order number',
              },
              questionAnswers: {
                type: 'array',
                description: 'Exactly 4 answers for the question',
                items: {
                  type: 'object',
                  properties: {
                    answer: {
                      type: 'string',
                      description: 'Answer text',
                    },
                    score: {
                      type: 'number',
                      minimum: 0,
                      maximum: 100,
                      description: 'Score for this answer (0-100)',
                    },
                  },
                  required: ['answer', 'score'],
                  additionalProperties: false,
                },
              },
            },
            required: ['question', 'complexity', 'order', 'questionAnswers'],
            additionalProperties: false,
          },
        },
      },
      required: ['quiz'],
      additionalProperties: false,
    },
  },
};
