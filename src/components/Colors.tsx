/* @jsxImportSource solid-js */
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { get, send } from "./Utils"

export default function (props) {
    const [state, setState] = createStore({ selected: 0, colors: [], max: 0 })
    const refresh = (count) => {
        for (let i = 0; i < count; i++)
            get(`${props.key},2,${i}`)
                .then((response) => response.text())
                .then((result) => setState("colors", i, result))
                .catch((error) => console.error('Error:', error))
    }
    get(`${props.key},0`)
        .then((response) => response.text())
        .then((result) => refresh(parseInt(result)))
        .catch((error) => console.error('Error:', error))
    get(`${props.key},1`)
        .then((response) => response.text())
        .then((result) => setState({ selected: parseInt(result) }))
        .catch((error) => console.error('Error:', error))
    get(`${props.key},3`)
        .then((response) => response.text())
        .then((result) => setState({ max: parseInt(result) }))
        .catch((error) => console.error('Error:', error))
    const updateSelected = (selected) => {
        setState({ selected: selected })
        send(props.key, `1,${selected}`)
    }
    const updateColor = (index, value) => {
        setState("colors", index, value)
        send(props.key, `2,${index},${value}`)
    }
    const removeColor = (index) => {
        setState("colors", [...state.colors.slice(0, index), ...state.colors.slice(index + 1)])
        send(props.key, `0,${state.colors.length}`)
        for (let i = index; i < state.colors.length; i++)
            send(props.key, `2,${i},${state.colors[i]}`)
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
                                        max={props.max}
                                        onChange={(e) => updateColor(i(), e.target.value)}
                                        class="form-input bg-white dark:bg-slate-800 shadow overflow-hidden rounded-md h-10" />
                                </td>
                                <td>
                                    <Show when={i() > 1}>
                                        <button
                                            onClick={() => removeColor(i())}
                                            class="px-2 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 hover:shadow-lg active:bg-red-800 active:shadow-lg transition duration-300">
                                            x
                                        </button>
                                    </Show>
                                </td>
                            </tr>
                        )}
                    </For>
                </table>
                <Show when={state.colors.length < state.max}>
                    <button
                        onClick={() => updateColor(state.colors.length, "#ffffff")}
                        class="px-2 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-300 my-2">
                        +
                    </button>
                </Show>
            </div>
        </>
    )
}


