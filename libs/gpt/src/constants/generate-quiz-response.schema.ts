export const generateQuizResponseSchema = {
  name: 'quiz',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      quiz: {
        type: 'array',
        description: 'A sequence of quiz items.',
        items: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              description: 'The text of the question.',
            },
            complexity: {
              type: 'number',
              description: 'Complexity rating for the question.',
            },
            order: {
              type: 'number',
              description: 'Order of the question in the quiz.',
            },
            questionAnswers: {
              type: 'array',
              description: 'List of possible answers for the question.',
              items: {
                type: 'object',
                properties: {
                  answer: {
                    type: 'string',
                    description: 'Text of the answer.',
                  },
                  score: {
                    type: 'number',
                    description: 'Score associated with this answer.',
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
};
