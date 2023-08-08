import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import moment from "moment";
import { render } from "@react-email/render";
import NotifySizeUpdateMail from "../../src/emails/NotifySizeUpdateMail";
import { TRANSPORTER } from "../../src/emails/mailer";

type Result = {
  message: string;
};
export default async function contact(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const email = req.body.email;
  const slug = req.body.slug;
  const sizes = req.body.sizes;
  const regex_email = /^[A-Z\d._%+-]+@([A-Z\d-]+\.)+[A-Z]{2,4}$/i;
  const langMessages = require(`../../public/locales/${req.body.lang}/notify-size-update.json`);
  if (email && slug && sizes) {
    if (regex_email.test(email)) {
      let product: Array<{ _id: string, name: string }> = [];
      await sanityClient
        .fetch(
          `*[_type == 'products' && slug.current == $slug ]{
                _id, name
            }`,
          { slug: slug }
        )
        .then(async (response) => {
          product = response;
        });
      if (product.length > 0) {
        /* await sanityClient.create({
          _type: "productsWaitlist",
          email: email,
          product: {
            _type: "reference",
            _ref: product[0]._id,
          },
          sizes: sizes,
          createdAt: moment().format()
        }); */
        
      require("dotenv").config();
      const USERNAME = process.env["MAIL_USERNAME"];
      const html = render(
        NotifySizeUpdateMail({ sizes: sizes, email: email, product: product[0].name })
      );
      const body = {
        from: USERNAME,
        to: USERNAME,
        cc: ["andremine98@gmail.com", "marcantoine826@gmail.com"],
        subject: `${langMessages.api.subject_mail} from ${email}`,
        html: html,
      };
      TRANSPORTER.sendMail(body, function (err: any, info: any) {
        if (err) {
          res.status(500).json({ message: langMessages.api.something_wrong });
        } else {
          res.status(200).json({ message: langMessages.api.success });
        }
      });
      } else {
        res.status(400).json({ message: langMessages.api.product_unavailable });
      }
    } else {
      res.status(400).json({ message: langMessages.api.invalid_email });
    }
  } else {
    res.status(400).json({ message: langMessages.api.field_required });
  }
}
