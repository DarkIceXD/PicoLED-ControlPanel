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
                    type="checkbox"
                    checked={value() === "1" ? true : false}
                    onChange={(e) => send(props.key, e.target.checked ? 1 : 0)}
                    class="form-checkbox dark:bg-slate-800 dark:checked:bg-blue-700 shadow overflow-hidden rounded-md" />
                <span>{props.children}</span>
            </label>
        </>
    )
}