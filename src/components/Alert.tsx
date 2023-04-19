import {Dispatch, SetStateAction} from "react";
import {CHECK_SVG, DANGER_SVG, WARNING_SVG} from "./svg";

interface AlertProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    text: string,
    title: string,
    type: string
}

function configAlert(type: string): { bg: string, icon: JSX.Element } {
    let icon: JSX.Element = WARNING_SVG;
    let bg = "bg-yellow-100";
    switch (type) {
        case "success":
            icon = CHECK_SVG
            bg = "bg-green-100";
            break
        case "danger":
            icon = DANGER_SVG
            bg = "bg-red-100"
            break
    }
    return {bg: bg, icon: icon}
}

export default function Alert({visible, setVisible, title, text, type}: AlertProps) {
    const config = configAlert(type);
    return (<>
            {visible && (
                <div className="relative z-[99] modal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-[80] overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${config.bg}`}>
                                            {config.icon}
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900"
                                                id="modal-title">{title}</h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">{text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 flex justify-center sm:px-6">
                                    <button onClick={() => setVisible(false)} type="button"
                                            className="w-full rounded-md border border-transparent bg-gradient px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm">Ok
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    )
}
