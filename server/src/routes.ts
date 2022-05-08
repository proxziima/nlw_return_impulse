import express from 'express';
import { NodemailMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodemailMailAdapter = new NodemailMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailMailAdapter
    );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    });



    // return res.status(201).json({ data: feedback }); 
    return res.status(201).send(); //importante saber os status http
});
