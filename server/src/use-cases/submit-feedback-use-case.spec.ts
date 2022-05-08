import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

//spies = espiões -> saber dentro do teste se uma função foi chamada
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

//cria uma suite de testes unitários usando o framework Jest

//O Jest utiliza de 'matchers' (combinadores) para efetuar testes na funcionalidade do código

//Esses  testes aumentam a segurança de verificar todo o App antes do deploy

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,as98u21983u98asdasd'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type ', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,as98u21983u98asdasd'
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment ', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,as98u21983u98asdasd'
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with invalid screenshot ', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Ta tudo bugado',
            screenshot: 'text.jpg'
        })).rejects.toThrow();
    });
});
