/* @jsxImportSource solid-js */
import { createSignal, For, Show } from "solid-js"
import { get, send } from "./Utils"

export default function (props) {
    const [selected, setSelected] = createSignal(0)
    const [colors, setColors] = createSignal([])
    const [max, setMax] = createSignal(0)
    const refresh = (count) => {
        for (let i = 0; i < count; i++) {
            setColors((old) => [...old, "#ffffff"])
            get(props.key, 2, i)
                .then((response) => response.text())
                .then((result) => setColors((old) => [...old.slice(0, i), result, ...old.slice(i + 1)]))
                .catch((error) => console.error('Error:', error))
        }
    }
    get(props.key, 0)
        .then((response) => response.text())
        .then((result) => refresh(parseInt(result)))
        .catch((error) => console.error('Error:', error))
    get(props.key, 1)
        .then((response) => response.text())
        .then((result) => setSelected(parseInt(result)))
        .catch((error) => console.error('Error:', error))
    get(props.key, 3)
        .then((response) => response.text())
        .then((result) => setMax(parseInt(result)))
        .catch((error) => console.error('Error:', error))
    const updateSelected = (selected) => {
        setSelected(selected)
        send(props.key, 1, selected)
    }
    const updateColor = (index, value) => {
        send(props.key, 2, index, value)
    }
    const addColor = () => {
        setColors((old) => [...old, "#ffffff"])
        send(props.key, 0, colors().length)
    }
    const removeColor = (index) => {
        setColors((old) => [...old.slice(0, index), ...old.slice(index + 1)])
        const newColors = colors()
        send(props.key, 0, newColors.length)
        for (let i = index; i < newColors.length; i++)
            send(props.key, 2, i, newColors[i])
    }
    return (
        <>
            <div>
                <table>
                    <For each={colors()}>
                        {(s, i) => (
                            <tr>
                                <td>
                                    <input
                                        type="radio"
                                        class="form-radio h-4 w-4"
                                        onChange={() => updateSelected(i())}
                                        checked={selected() == i()}
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
                                            -
                                        </button>
                                    </Show>
                                </td>
                            </tr>
                        )}
                    </For>
                </table>
                <Show when={colors().length < max()}>
                    <button
                        onClick={() => addColor()}
                        class="px-2 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-300 my-2">
                        +
                    </button>
                </Show>
            </div>
        </>
    )
}


