import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Alert from "./Alert";
import {useTranslation} from "next-i18next";

export default function Contact() {
    const {register, reset, handleSubmit} = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [onLoading, setOnLoading] = useState(false);
    const [configAlert, setConfigAlert] = useState({title: "", text: "", status: ""});
    const {t, i18n} = useTranslation("contact");

    const handleSubmitContactForm = async (data: any) => {
        setOnLoading(true);
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
        setOnLoading(false);
    }

    return (
        <>
            <div
                id="contact-us"
                className="dark:bg-neutral-800 border-t border-neutral-200 dark:border-t dark:border-neutral-600"
            >
                <div className={"lg:w-3/6 md:w-4/6 w-full p-4 mx-auto"}>
                    <h1 className={"text-center text-6xl font-bold mb-4 text-gradient"}>
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
                            })}
                        />
                        <input
                            type="email"
                            className=" dark:bg-transparent dark:text-white"
                            placeholder={`${t("form.email")}`}
                            {...register("email", {
                                required: true,
                            })}
                        />
                        <textarea
                            cols={50}
                            placeholder={`${t("form.message")}`}
                            className={"resize-none dark:bg-transparent dark:text-white"}
                            {...register("message", {
                                required: true,
                            })}
                        ></textarea>
                        <div className={"w-full text-center mt-5"}>
                            {onLoading ? (
                                <span className="loader"></span>
                            ) : (
                                <button
                                    className={
                                        "mx-auto px-10 py-3 hover:bg-opacity-20 text-white"
                                    }
                                >
                                    {t("form.button")}
                                </button>
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
