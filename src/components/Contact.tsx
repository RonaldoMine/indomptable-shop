import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Alert from "./Alert";
import {useTranslation} from "next-i18next";
import {ButtonGradient} from "./Button";
import Loader from "./Loader";

export default function Contact() {
    const {register, reset, handleSubmit} = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [configAlert, setConfigAlert] = useState({title: "", text: "", status: ""});
    const {t, i18n} = useTranslation("contact");

    const handleSubmitContactForm = async (data: any) => {
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
        const response = await fetch("/api/contact", options);
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
                id="contact-us"
                className="dark:bg-neutral-800 border-t border-neutral-200 dark:border-t dark:border-neutral-600"
            >
                <div className={"lg:w-3/6 md:w-4/6 w-full p-4 mx-auto"}>
                    <h1 className={"text-center text-6xl font-bold mb-4 text-gradient-simple"}>
                        {t("title")}
                    </h1>
                    <form
                        onSubmit={handleSubmit(handleSubmitContactForm)}
                        method={"post"}
                    >
                        <input
                            type="text"
                            className={
                                "ring:border-red-500 dark:bg-transparent dark:text-white"
                            }
                            placeholder={`${t("form.name")}`}
                            {...register("name", {
                                required: true,
                                disabled: isLoading
                            })}
                        />
                        <input
                            type="email"
                            className=" dark:bg-transparent dark:text-white"
                            placeholder={`${t("form.email")}`}
                            {...register("email", {
                                required: true,
                                disabled: isLoading
                            })}
                        />
                        <textarea
                            cols={50}
                            placeholder={`${t("form.message")}`}
                            className={"resize-none dark:bg-transparent dark:text-white"}
                            {...register("message", {
                                required: true,
                                disabled: isLoading
                            })}
                        ></textarea>
                        <div className={"w-full text-center mt-5"}>
                            {isLoading ? (
                                <Loader/>
                            ) : (
                                <ButtonGradient>
                                    {t("form.button")}
                                </ButtonGradient>
                            )}
                        </div>
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
