export default function NotifySizeUpdateMail({sizes, email, product}: { sizes: [], email: string, product: string }) {
    const styles: any = {
        table: {
            borderSpacing: 0,
            borderCollapse: "collapse",
        },
        tableHeader: {
            background: "linear-gradient(90deg, rgb(255,194,0), rgb(238,20,19), rgb(255,194,0))",
            color: "#fff",
            borderBottom: 0,
            fontWeight: "bold",
            lineHeight: "100%",
            verticalAlign: "middle",
            borderRadius: "3px 3px 0 0",
            borderSpacing: 0,
            borderCollapse: "collapse",
            width: "100%"
        },
    }
    return (
        <div style={{background: "#f1f1f1"}}>
            <div style={{maxWidth: "600px", margin: "0 auto", background: "#FFF"}}>
                <table align="center" role="presentation" cellSpacing="0" cellPadding="0" style={styles.table}>
                    <tr>
                        <td valign="top">
                            <table role="presentation" cellPadding="0" cellSpacing="0" style={styles.tableHeader}>
                                <tr>
                                    <td className="logo" style={{padding: "36px 48px"}}>
                                        <h1 style={{
                                            fontSize: "25px",
                                            fontWeight: "300",
                                            lineHeight: "150%",
                                            textAlign: "center",
                                            color: "#FFF"
                                        }}>Nouvelle demande de notification lors de la mise à jour du stock</h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top">
                            <table border={0} cellPadding="0" cellSpacing="0" width="600"
                                   id="m_-3538529548893982482template_body">
                                <tbody>
                                <tr>
                                    <td valign="top" id="m_-3538529548893982482body_content"
                                        style={{backgroundColor: "#fff"}}>
                                        <table border={0} cellPadding="20" cellSpacing="0" width="100%">
                                            <tbody>
                                            <tr>
                                                <td valign="top" style={{padding: "48px 48px 32px"}}>
                                                    <div style={{
                                                        color: "#636363",
                                                        fontSize: "14px",
                                                        lineHeight: "150%",
                                                        textAlign: "left"
                                                    }}>

                                                        <p style={{margin: "0 0 16px"}}>Bonjour la Team
                                                            Indomptable</p>
                                                        <p style={{margin: "0 0 16px"}}>Une nouvelle demande de notification lors de la mise à jour du stock a été enregistrée avec les détails suivants: </p>
                                                        <p style={{margin: "0 0 16px"}}><b>Email</b> : {email}</p>
                                                        <p style={{margin: "0 0 16px"}}><b>Produit</b> : {product}</p>
                                                        <p style={{margin: "0 0 16px"}}><b>Sises</b> : {sizes.toString()}</p>
                                                    </div>
                                                </td>
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
