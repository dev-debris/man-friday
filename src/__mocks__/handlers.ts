import apiRoutes from '@/shared/api/apiRoutes';
import { HttpResponse, http } from 'msw';

const API_DOMAIN = 'http://localhost:3000';


export const handlers = [
  http.post(`${API_DOMAIN}${apiRoutes.openAIAutoMessage}`, async ({ request }) => {
    const body = await request.json();

    const { mode, keywords } = body as { mode: string; keywords: string[] };

    return HttpResponse.json({
      message: `${mode} ${keywords.join(' ')}를 이용한 답변입니다.`,
    });
  }),
];
