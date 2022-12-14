/* @jsxImportSource solid-js */
import { createSignal, For } from "solid-js"
import { get, send } from "./Utils"

export default function (props) {
    const [value, setValue] = createSignal(0);
    get(props.key)
        .then((response) => response.text())
        .then((result) => setValue(parseInt(result)))
        .catch((error) => console.error('Error:', error))
    return (
        <>
            <select
                class="form-select bg-white dark:bg-slate-800 shadow overflow-hidden rounded-md my-2"
                onChange={(e) => send(props.key, e.target.value)}>
                <For each={props.options}>
                    {(item, index) =>
                        <option selected={index() == value()} value={index()}>{item}</option>
                    }
                </For>
            </select>
        </>
    )
}