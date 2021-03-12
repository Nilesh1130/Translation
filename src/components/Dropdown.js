import React, { useState, useEffect, useRef } from "react"

const Dropdown = ({ dropdownOptions, selected, onSelectedChange, label }) => {
    // state to manage toggle visibility
    const [open, setOpen] = useState(false)
    // set ref variable
    const ref = useRef()
    //on initial render, add click event listener
    // useEffect(() => {
    //     const onBodyClick = event => {
    //         // check if element that was clicked is inside of ref'd component
    //         // if so no action is required from this event listener so exit
    //         if (ref.current && ref.current.contains(event.target)) {
    //             return
    //         }
    //         // else close the dropdown
    //         setOpen(false)
    //     }

    //     // add event listener
    //     document.body.addEventListener("click", onBodyClick)

    //     // CLEANUP
    //     // remove event listener
    //     return () => { document.body.removeEventListener("click", onBodyClick) }
    // }, [])
    const mappedDropdownOptions = dropdownOptions.map(option => {
        if (option.value === selected.value) { return null }
        return (
            <div key={option.value}
                // on click change selection to current option
                onClick={() => onSelectedChange(option)}>
                {option.label}
            </div>
        )
    })

    return (
        <div className="ui form">
            <div className="field">
                <label className="label">{ label}</label>
                <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? "visible active" : ""}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div // on click set value of open to opposite of current value
                        onClick={() => setOpen(!open)} className={`menu ${open ? "visible transition" : ""}`}>{mappedDropdownOptions}</div>
                </div>
            </div>
        </div>
    );

}

export default Dropdown