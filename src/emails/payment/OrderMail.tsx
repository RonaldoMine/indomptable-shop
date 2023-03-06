import {Html} from "@react-email/html";
import {OrderInterface} from "../../../typings";

export default function OrderMail({
                                      firstName,
                                      lastName,
                                      phoneNumber,
                                      email,
                                      address,
                                      amount,
                                      totalProduct,
                                      reference,
                                      products
                                  }: OrderInterface) {
    const styles: any = {
        table: {
            borderSpacing: 0,
            borderCollapse: "collapse",
        },
        product: {
            style: {
                display: "flex",
                padding: "0 .5rem",
                alignItems: "center"
            },
            img: {
                width: "100px",
                maxWidth: "600px",
                height: "auto",
                display: "block",
                objectFit: "contain"
            },
            text: {
                style: {
                    float: "left",
                    marginTop: 0,
                    width: "100%",
                    paddingLeft: "20px",
                },
                p: {
                    marginTop: 0
                },
            },
        },
        link: {
            textDecoration: "none",
            color: "#EE1413FF",
        },
        h3: {
            marginBottom: 0,
            paddingBottom: 0,
            fontWeight: "normal"
        }
    }
    return (
        <Html lang="en" dir="ltr">
            <div style={{background: "#f1f1f1", fontSize: "14px", color: "#000"}}>
                <div style={{maxWidth: "600px", margin: "0 auto", background: "#FFF"}} className="email-container">
                    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" style={styles.table}>
                        <tr>
                            <td valign="top" className="bg_white" style={{
                                padding: "1em 2.5em 0 2.5em;",
                                color: "#FFF",
                                background: "linear-gradient(90deg, #FFC200FF, #EE1413FF, #FFC200FF)"
                            }}>
                                <table role="presentation" cellPadding="0" cellSpacing="0" style={styles.tableHeader}>
                                    <tr>
                                        <td className="logo" style={{padding: "36px 48px"}}>
                                            <h1 style={{
                                                fontSize: "25px",
                                                fontWeight: "300",
                                                lineHeight: "150%",
                                                textAlign: "center",
                                                color: "#FFF"
                                            }}>UNE NOUVELLE COMMANDE INDOMPTABLE</h1>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" className="hero bg_white" style={{padding: "2em 0 2em 0"}}>
                                <table role="presentation" border={0} cellPadding="0" cellSpacing="0" width="100%">
                                    <tr>
                                        <td style={{padding: "0 2.5em", textAlign: "left"}}>
                                            <div className="text">
                                                <h3 style={styles.h3}>Salut {lastName}</h3>
                                                <h3 style={styles.h3}>Ta commande [{reference}] a été payéée et validée, découvre tous les
                                                    détails en dessous.</h3>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <table className="bg_white" role="presentation" border={0} cellPadding="0" cellSpacing="0"
                                   width="100%" style={styles.table}>
                                <tr style={{borderBottom: "1px solid rgba(0,0,0,.05)"}}>
                                    <th
                                        style={{
                                            width: "80%",
                                            textAlign: "left",
                                            padding: "0 2.5em",
                                            paddingBottom: "20px"
                                        }}>
                                        Produits
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "right",
                                            padding: "0 2.5em",
                                            paddingBottom: "20px"
                                        }}>
                                        Quantité
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "right",
                                            padding: "0 2.5em",
                                            color: "#000",
                                            paddingBottom: "20px"
                                        }}>
                                        Prix
                                    </th>
                                </tr>
                                <tbody>
                                {
                                    products.map((product) => {
                                        return (
                                            <tr style={{borderBottom: "1px solid rgba(0,0,0,.05)"}}>
                                                <td valign="middle" width="85%"
                                                    style={{textAlign: "left", padding: "12px"}}>
                                                    <div style={styles.product.style}>
                                                        <img
                                                            alt={product.name}
                                                            src={product.image}
                                                            style={styles.product.img}/>
                                                        <div style={styles.product.text.style}>
                                                            <h4 style={styles.h3}>{product.name}</h4>
                                                            <p style={styles.product.text.p}>
                                                                <b>Taille</b>: {product.size}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td valign="middle" width="5%"
                                                    style={{textAlign: "center", padding: "12px"}}>
                                                    <span className="price"
                                                          style={{color: "#000"}}>{product.qty}</span>
                                                </td>
                                                <td valign="middle" width="10%"
                                                    style={{textAlign: "center", padding: "12px"}}>
                                                    <span className="price"
                                                          style={{color: "#000"}}>{product.price} XAF</span>
                                                </td>
                                            </tr>)
                                    })
                                }
                                </tbody>
                                <tfoot>
                                <tr style={{borderBottom: "1px solid #F1EFEF"}}>
                                    <th colSpan={2} style={{textAlign: "right", padding: "12px"}}>
                                        Nombre de produits:
                                    </th>
                                    <td>
                                        {totalProduct}
                                    </td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #F1EFEF"}}>
                                    <th colSpan={2} style={{textAlign: "right", padding: "12px"}}>
                                        Montant:
                                    </th>
                                    <td>
                                        {parseInt(amount) - 1000} XAF
                                    </td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #F1EFEF"}}>
                                    <th colSpan={2} style={{textAlign: "right", padding: "12px"}}>
                                        Livraison:
                                    </th>
                                    <td>
                                        1000 XAF
                                    </td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #F1EFEF"}}>
                                    <th colSpan={2} style={{textAlign: "right", padding: "12px"}}>
                                        Montant Total:
                                    </th>
                                    <td>
                                        {amount} XAF
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </tr>
                    </table>
                    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border={0} width="100%"
                           style={{margin: "auto", padding: "32px 48px 10px"}}>
                        <tr>
                            <td style={{
                                textAlign: "left",
                            }}>
                                <h3 style={{color: "#EE1413FF"}}>Adresse de livraison</h3>
                                <address style={{
                                    border: "1px solid #e5e5e5", padding: "10px 15px",
                                    fontStyle: "italic"
                                }}>
                                    {lastName + " " + firstName} <br/>
                                    {address} <br/>
                                    {phoneNumber} <br/>
                                    {email} <br/>
                                </address>
                            </td>
                        </tr>
                    </table>
                    <p style={{padding: "20px 45px"}}>Merci pour votre achat 💖</p>
                </div>
            </div>
        </Html>
    );
}
