// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import PDF from "html-pdf"
import ContactMail from "../../src/emails/contact/ContactMail";
import {render} from "@react-email/render";

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const html = render(ContactMail({message: "Hello World", name: "Ronaldo", email: "andre@gmail.com"}));
    const name = new Date().getTime()
    //console.log(html)
    PDF.create(html).toFile(`./public/orders/${name}.pdf`, (err: any, res: any) => {
        //console.log(res);
    });
    //doc.save("./public/orders/orders.pdf");
    res.status(200).json({name: 'John Doe'})
}
