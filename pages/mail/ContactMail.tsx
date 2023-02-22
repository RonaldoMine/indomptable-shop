import {Html} from "@react-email/html";

export default function ContactMail({message}: { message: string }) {
    const styles: any = {
        table: {
            borderSpacing: 0,
            borderCollapse: "collapse",
        },
        product: {
            style: {
                display: "flex",
                position: "relative",
                float: "left",
                padding: "0 .5rem",
                alignItems:"center"
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
                    width: "calc(100% - 125px)",
                    paddingLeft: "20px",
                },
                p: {
                    marginTop: 0
                },
                h3: {
                    marginBottom: 0,
                    paddingBottom: 0
                }
            },
            link: {
                textDecoration: "none",
                color: "#EE1413FF"
            }
        },
    }
    return (
        <Html lang="en" dir="ltr">
            <div style={{background: "#f1f1f1"}}>
                <div style={{maxWidth: "600px", margin: "0 auto", background: "#FFF"}} className="email-container">
                    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" style={styles.table}>
                        <tr>
                            <td valign="top" className="bg_white" style={{padding: "1em 2.5em 0 2.5em;"}}>
                                <table role="presentation" cellPadding="0" cellSpacing="0" style={styles.table}>
                                    <tr>
                                        <td className="logo" style={{textAlign: "left"}}>
                                            <h1><a href="#" style={styles.link}>Indomptable</a></h1>
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
                                                <h2>Ronald your shopping cart misses you</h2>
                                                <h3>Amazing deals, updates, interesting news right in your inbox</h3>
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
                                            color: "#000",
                                            paddingBottom: "20px"
                                        }}>
                                        Item
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "right",
                                            padding: "0 2.5em",
                                            color: "#000",
                                            paddingBottom: "20px"
                                        }}>
                                        Price
                                    </th>
                                </tr>
                                <tr style={{borderBottom: "1px solid rgba(0,0,0,.05)"}}>
                                    <td valign="middle" width="80%" style={{textAlign: "left", padding: "1.5em 2.5em;"}}>
                                        <div style={styles.product.style}>
                                            <img
                                                src={"https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg"}
                                                alt=""
                                                style={styles.product.img}/>
                                            <div style={styles.product.text.style}>
                                                <h3 style={styles.product.text.h3}>Analog Wrest Watch</h3>
                                                <p style={styles.product.text.p}>A small river named Duden flows by their place and supplies it
                                                    with the necessary
                                                    regelialia.</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td valign="middle" width="20%" style={{textAlign: "left", padding: "0 2.5em"}}>
                                        <span className="price" style={{color: "#000", fontSize: "20px"}}>$120</span>
                                    </td>
                                </tr>
                                <tr style={{borderBottom: "1px solid rgba(0,0,0,.05)"}}>
                                    <td valign="middle" width="80%" style={{textAlign: "left", padding: "1.5em 2.5em;"}}>
                                        <div style={styles.product.style}>
                                            <img
                                                src={"https://images.pexels.com/photos/428311/pexels-photo-428311.jpeg"}
                                                alt=""
                                                style={styles.product.img}/>
                                            <div style={styles.product.text.style}>
                                                <h3 style={styles.product.text.h3}>Product 2</h3>
                                                <p style={styles.product.text.p}>A small river named Duden flows by their place and supplies it
                                                    with the necessary
                                                    regelialia.</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td valign="middle" width="20%" style={{textAlign: "left", padding: "0 2.5em"}}>
                                        <span className="price" style={{color: "#000", fontSize: "20px"}}>$120</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="middle" style={{textAlign: "left", padding: "1em 2.5em"}}>
                                        <p><a href="#" className="btn btn-primary">Continuer your order</a></p>
                                    </td>
                                </tr>
                            </table>
                        </tr>

                    </table>
                    {/*
                    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border={0} width="100%"
                           style="margin: auto;">
                        <tr>
                            <td valign="middle" className="bg_light footer email-section">
                                <table>
                                    <tr>
                                        <td valign="top" width="33.333%" style="padding-top: 20px;">
                                            <table role="presentation" cellSpacing="0" cellPadding="0" border={0}
                                                   width="100%">
                                                <tr>
                                                    <td style="textAlign: left; padding-right: 10px;">
                                                        <h3 className="heading">About</h3>
                                                        <p>A small river named Duden flows by their place and supplies
                                                            it with the
                                                            necessary regelialia.</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td valign="top" width="33.333%" style="padding-top: 20px;">
                                            <table role="presentation" cellSpacing="0" cellPadding="0" border={0}
                                                   width="100%">
                                                <tr>
                                                    <td style="textAlign: left; padding-left: 5px; padding-right: 5px;">
                                                        <h3 className="heading">Contact Info</h3>
                                                        <ul>
                                                            <li><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span>
                                                            </li>
                                                            <li><span className="text">+2 392 3929 210</span></a>
                                                        </li>
                                                    </ul>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td valign="top" width="33.333%" style="padding-top: 20px;">
                                <table role="presentation" cellSpacing="0" cellPadding="0" border={0} width="100%">
                                    <tr>
                                        <td style="textAlign: left; padding-left: 10px;">
                                            <h3 className="heading">Useful Links</h3>
                                            <ul>
                                                <li><a href="#">Home</a></li>
                                                <li><a href="#">Account</a></li>
                                                <li><a href="#">Wishlist</a></li>
                                                <li><a href="#">Order</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>*/}
                </div>
            </div>
        </Html>
    );
}
