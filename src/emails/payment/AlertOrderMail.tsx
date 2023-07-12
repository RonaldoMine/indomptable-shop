import { OrderInterface } from "../../../typings";

export default function ContactMail({
  firstName,
  lastName,
  phoneNumber,
  email,
  address,
  amount,
  totalProduct,
  reference,
  products,
  town,
}: OrderInterface) {
  const styles: any = {
    table: {
      borderSpacing: 0,
      borderCollapse: "collapse",
    },
    tableHeader: {
      background:
        "linear-gradient(90deg, rgb(255,194,0), rgb(238,20,19), rgb(255,194,0))",
      color: "#fff",
      borderBottom: 0,
      fontWeight: "bold",
      lineHeight: "100%",
      verticalAlign: "middle",
      borderRadius: "3px 3px 0 0",
      borderSpacing: 0,
      borderCollapse: "collapse",
      width: "100%",
    },

    product: {
      style: {
        display: "flex",
        padding: "0 .5rem",
        alignItems: "center",
      },
      img: {
        width: "100px",
        maxWidth: "600px",
        height: "auto !important",
        display: "block",
        objectFit: "contain",
      },
      text: {
        style: {
          float: "left",
          marginTop: 0,
          width: "100%",
          paddingLeft: "20px",
        },
        p: {
          marginTop: 0,
        },
      },
    },
  };
  return (
    <div style={{ background: "#f1f1f1" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "#FFF" }}>
        <table
          align="center"
          role="presentation"
          cellSpacing="0"
          cellPadding="0"
          style={styles.table}
        >
          <tr>
            <td valign="top">
              <table
                role="presentation"
                cellPadding="0"
                cellSpacing="0"
                style={styles.tableHeader}
              >
                <tr>
                  <td className="logo" style={{ padding: "36px 48px" }}>
                    <h1
                      style={{
                        fontSize: "25px",
                        fontWeight: "300",
                        lineHeight: "150%",
                        textAlign: "center",
                        color: "#FFF",
                      }}
                    >
                      Une nouvelle commande a été validée dans la boutique en
                      ligne
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <table border={0} cellPadding="0" cellSpacing="0" width="600">
                <tbody>
                  <tr>
                    <td valign="top" style={{ backgroundColor: "#fff" }}>
                      <table
                        border={0}
                        cellPadding="20"
                        cellSpacing="0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              valign="top"
                              style={{ padding: "48px 48px 32px" }}
                            >
                              <div
                                style={{
                                  color: "#636363",
                                  fontSize: "14px",
                                  lineHeight: "150%",
                                  textAlign: "left",
                                }}
                              >
                                <p style={{ margin: "0 0 16px" }}>
                                  Bonjour la Team Indomptable
                                </p>
                                <p style={{ margin: "0 0 16px" }}>
                                  Un client vient de valider une commande de{" "}
                                  <b>{totalProduct}</b> t-shirt(s) avec pour
                                  référence <b>{reference}</b>, les détails de
                                  la commande sont les suivants:
                                </p>

                                <p style={{ margin: "0 0 16px" }}>
                                  <b>Nom et prénoms </b> :{" "}
                                  {lastName + " " + firstName}
                                </p>
                                <p style={{ margin: "0 0 16px" }}>
                                  <b>Email</b> : {email}
                                </p>
                                <p style={{ margin: "0 0 16px" }}>
                                  <b>Téléphone</b> : {phoneNumber}
                                </p>
                                <p style={{ margin: "0 0 16px" }}>
                                  <b>Ville</b> : {town}
                                </p>
                                <p style={{ margin: "0 0 16px" }}>
                                  <b>Adresse</b> : {address}
                                </p>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <table
                              role="presentation"
                              border={0}
                              cellPadding="0"
                              cellSpacing="0"
                              width="100%"
                              style={styles.table}
                            >
                              <tr
                                style={{
                                  borderBottom: "1px solid rgba(0,0,0,.05)",
                                }}
                              >
                                <th
                                  style={{
                                    width: "80%",
                                    textAlign: "left",
                                    padding: "0 2.5em",
                                    paddingBottom: "20px",
                                  }}
                                >
                                  Produits
                                </th>
                                <th
                                  style={{
                                    textAlign: "right",
                                    padding: "0 2.5em",
                                    paddingBottom: "20px",
                                  }}
                                >
                                  Quantité
                                </th>
                                <th
                                  style={{
                                    textAlign: "right",
                                    padding: "0 2.5em",
                                    color: "#000",
                                    paddingBottom: "20px",
                                  }}
                                >
                                  Prix
                                </th>
                              </tr>
                              <tbody>
                                {products.map((product) => {
                                  return (
                                    <tr
                                      key={product.sku}
                                      style={{
                                        borderBottom:
                                          "1px solid rgba(0,0,0,.05)",
                                      }}
                                    >
                                      <td
                                        valign="middle"
                                        width="85%"
                                        style={{
                                          textAlign: "left",
                                          padding: "12px",
                                        }}
                                      >
                                        <div style={styles.product.style}>
                                          <img
                                            /*width={100}
                                                            height={100}*/
                                            alt={product.name}
                                            src={product.image}
                                            style={styles.product.img}
                                          />
                                          <div
                                            style={styles.product.text.style}
                                          >
                                            <h4 style={styles.h3}>
                                              {product.name}
                                            </h4>
                                            <p style={styles.product.text.p}>
                                              <b>Taille</b>: {product.size}{" "}
                                              <br />
                                              <b>Couleur</b>: {product.color}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td
                                        valign="middle"
                                        width="5%"
                                        style={{
                                          textAlign: "center",
                                          padding: "12px",
                                        }}
                                      >
                                        <span
                                          className="price"
                                          style={{ color: "#000" }}
                                        >
                                          {product.qty}
                                        </span>
                                      </td>
                                      <td
                                        valign="middle"
                                        width="10%"
                                        style={{
                                          textAlign: "center",
                                          padding: "12px",
                                        }}
                                      >
                                        <span
                                          className="price"
                                          style={{ color: "#000" }}
                                        >
                                          {product.price} XAF
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                              <tfoot>
                                <tr
                                  style={{ borderBottom: "1px solid #F1EFEF" }}
                                >
                                  <th
                                    colSpan={2}
                                    style={{
                                      textAlign: "right",
                                      padding: "12px",
                                    }}
                                  >
                                    Total des produits:
                                  </th>
                                  <td>{totalProduct}</td>
                                </tr>
                                <tr
                                  style={{ borderBottom: "1px solid #F1EFEF" }}
                                >
                                  <th
                                    colSpan={2}
                                    style={{
                                      textAlign: "right",
                                      padding: "12px",
                                    }}
                                  >
                                    Montant:
                                  </th>
                                  <td>{parseInt(amount) - 1000} XAF</td>
                                </tr>
                                <tr
                                  style={{ borderBottom: "1px solid #F1EFEF" }}
                                >
                                  <th
                                    colSpan={2}
                                    style={{
                                      textAlign: "right",
                                      padding: "12px",
                                    }}
                                  >
                                    Frais de livraison:
                                  </th>
                                  <td>1000 XAF</td>
                                </tr>
                                <tr
                                  style={{ borderBottom: "1px solid #F1EFEF" }}
                                >
                                  <th
                                    colSpan={2}
                                    style={{
                                      textAlign: "right",
                                      padding: "12px",
                                    }}
                                  >
                                    Montant Total:
                                  </th>
                                  <td>{amount} XAF</td>
                                </tr>
                              </tfoot>
                            </table>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
