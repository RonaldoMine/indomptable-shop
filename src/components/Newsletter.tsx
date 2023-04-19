import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Alert from "./Alert";
import {useTranslation} from "next-i18next";

export default function Newsletter() {
    const {register, reset, handleSubmit} = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [onLoading, setOnLoading] = useState(false);
    const [configAlert, setConfigAlert] = useState({title: "", text: "", status: ""});
    const {t} = useTranslation("newsletter")

    const handleSubmitContactForm = async (data: any) => {
        setOnLoading(true);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
        setOnLoading(false);
    }

    return (
        <>
            <div
                id="newsletter"
                className="dark:bg-neutral-800 border-b border-neutral-200 dark:border-b dark:border-neutral-600"
            >
                <div className={"lg:w-4/6 md:w-5/6 w-full p-4 mx-auto"}>
                    <h1 className={"text-center text-6xl font-bold mb-2 text-gradient"}>
                        {t("title")}
                    </h1>
                    <p className={"text-center dark:text-white mb-16"}>
                        {t("subtitle")}
                    </p>
                    <form
                        onSubmit={handleSubmit(handleSubmitContactForm)}
                        method={"post"}
                        className={'flex max-w-[500px] sm:w-3/4 w-ful mx-auto'}
                    >
                        <input
                            type="email"
                            className={
                                "ring:border-red-500 dark:bg-transparent dark:text-white mb-0"
                            }
                            placeholder={`${t("form.email")}`}
                            {...register("email", {
                                required: true,
                            })}
                        />
                        {onLoading ? (
                            <div className={"ml-4"}><span className="loader"></span></div>
                        ) : (
                            <button
                                className={
                                    "hover:bg-opacity-20 text-white bg-gradient"
                                }
                            >
                                {t("form.button")}
                            </button>
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
