export type MandatQuestion = {
  id: string;
  question: string;
  questionType: string;
  articleId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type MandatQuestionsResponse = {
  statusCode: number;
  message: string;
  data: MandatQuestion[];
};
