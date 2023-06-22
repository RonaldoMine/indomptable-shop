import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Alert from "./Alert";
import {useTranslation} from "next-i18next";
import parallax_photo from "../../public/assets/images/parallax-home.webp";
import {ButtonGradient} from "./Button";
import Loader from "./Loader";


export default function Newsletter() {
    const {register, reset, handleSubmit} = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [configAlert, setConfigAlert] = useState({title: "", text: "", status: ""});
    const {t, i18n} = useTranslation("newsletter")

    const handleSubmitNewsletterForm = async (data: any) => {
        setIsLoading(true);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                lang: i18n.language
            }),
        }
        const response = await fetch("/api/newsletter", options);
        const result = await response.json();
        const status = response.status
        if (status == 200) {
            reset();
            setConfigAlert({title: "Success", text: result.message, status: "success"})
        } else {
            setConfigAlert({title: "Erreur", text: result.message, status: status === 400 ? "warning" : "danger"})
        }
        setShowAlert(true);
        setIsLoading(false);
    }

    return (
        <>
            <div
                id="newsletter"
                className="dark:bg-neutral-800 bg-fixed bg-center sm:bg-cover"
                style={{backgroundImage: `url('${parallax_photo.src}')`}}
            >
                <div className={"lg:w-4/6 md:w-5/6 w-full p-4 mx-auto"}>
                    <h1 className={"text-center text-4xl md:text-6xl font-bold mb-2 text-gradient-simple"}>
                        {t("title")}
                    </h1>
                    <p className={"text-center text-white mb-16"}>
                        {t("subtitle")}
                    </p>
                    <form
                        onSubmit={handleSubmit(handleSubmitNewsletterForm)}
                        method={"post"}
                        className={'flex items-center max-w-[500px] sm:w-3/4 w-ful mx-auto'}
                    >
                        <input
                            type="email"
                            className={
                                "ring:border-red-500 text-neutral-800 mb-0 bg-white "
                            }
                            placeholder={`${t("form.email")}`}
                            {...register("email", {
                                required: true,
                                disabled: isLoading
                            })}
                        />
                        {isLoading ? (
                            <Loader className="ml-4"></Loader>
                        ) : (
                            <ButtonGradient>
                                {t("form.button")}
                            </ButtonGradient>
                        )}
                    </form>
                </div>
            </div>
            <Alert
                type={configAlert.status}
                visible={showAlert}
                setVisible={setShowAlert}
                title={configAlert.title}
                text={configAlert.text}
            />
        </>
    );
}
