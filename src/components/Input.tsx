/* @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import { get, send } from "./Utils"

export default function (props) {
    const [value, setValue] = createSignal("");
    get(props.key)
        .then((response) => response.text())
        .then((result) => setValue(result))
        .catch((error) => console.error('Error:', error))
    return (
        <>
            <label class="flex items-center space-x-2 my-2">
                <input
                    type={props.type}
                    value={value()}
                    inputmode={props.inputmode}
                    max={props.max}
                    onChange={(e) => send(props.key, e.target.value)}
                    class={props.type == "range" ?
                        "w-full sm:w-1/3 h-2 bg-blue-100" :
                        "form-input bg-white dark:bg-slate-800 shadow overflow-hidden rounded-md"} />
                <span>{props.children}</span>
            </label>
        </>
    )
}