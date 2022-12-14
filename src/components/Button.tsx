/* @jsxImportSource solid-js */
import { send } from "./Utils"

export default function (props) {
    return (
        <>
            <button
                onClick={() => send(props.key)}
                class="px-6 py-2.5 bg-blue-600 text-white rounded shadow hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-300">
                {props.children}
            </button>
        </>
    )
}