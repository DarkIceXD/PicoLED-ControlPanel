/* @jsxImportSource solid-js */
import { createEffect, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { get, send } from "./Utils"

export default function (props) {
    const [state, setState] = createStore({ selected: 0, colors: [] })
    const refresh = (count) => {
        for (let i = 0; i < count; i++)
            get(props.url, `${props.key},2,${i}`)
                .then((response) => response.text())
                .then((result) => setState("colors", i, result))
                .catch((error) => console.error('Error:', error))
    }
    get(props.url, `${props.key},0`)
        .then((response) => response.text())
        .then((result) => refresh(parseInt(result)))
        .catch((error) => console.error('Error:', error))
    get(props.url, `${props.key},1`)
        .then((response) => response.text())
        .then((result) => state.selected = parseInt(result))
        .catch((error) => console.error('Error:', error))
    createEffect(() => {
        send(props.url, props.key, `0,${state.colors.length}`)
        state.colors.forEach((e, i) => send(props.url, props.key, `2,${i},${e}`))
    })
    const updateSelected = (selected) => {
        setState({ selected: selected })
        send(props.url, props.key, `1,${selected}`)
    }
    return (
        <>
            <div>
                <table>
                    <For each={state.colors}>
                        {(s, i) => (
                            <tr>
                                <td>
                                    <input
                                        type="radio"
                                        class="form-radio h-4 w-4"
                                        onChange={() => updateSelected(i())}
                                        checked={state.selected == i()}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="color"
                                        value={s}
                                        inputmode="numeric"
                                        max={props.max}
                                        onChange={(e) => setState("colors", i(), e.target.value)}
                                        class="form-input bg-white dark:bg-slate-800 shadow overflow-hidden rounded-md h-10" />
                                </td>
                                <td>
                                    <Show when={i() > 1}>
                                        <button
                                            onClick={() => setState("colors", [...state.colors.slice(0, i()), ...state.colors.slice(i() + 1)])}
                                            class="px-2 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 hover:shadow-lg active:bg-red-800 active:shadow-lg transition duration-300">
                                            x
                                        </button>
                                    </Show>
                                </td>
                            </tr>
                        )}
                    </For>
                </table>
                <Show when={state.colors.length < 8}>
                    <button
                        onClick={() => setState("colors", state.colors.length, "#ffffff")}
                        class="px-2 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-300 my-2">
                        +
                    </button>
                </Show>
            </div>
        </>
    )
}


