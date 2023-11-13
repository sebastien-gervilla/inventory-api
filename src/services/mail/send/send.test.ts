import { mock, createTransport } from 'nodemailer-mock';
const transport = createTransport({
    host: 'localhost', 
    port: 9999
});

describe('Testing mocked nodemailer service.', () => {
    it('Should send an email using the mocked nodemailer', async () => {
        await transport.sendMail({
            to: 'borrower@gmail.com'
        });
    
        const sentEmails = mock.getSentMail();
        expect(sentEmails.length).toBe(1);
        expect(sentEmails[0].to).toBe('borrower@gmail.com');
    });
})