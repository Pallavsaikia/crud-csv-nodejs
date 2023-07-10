import React,{MutableRefObject,forwardRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBox.css'
import { debounce, isStringEmpty } from '../../util'

interface SearchBoxProps {
    name: string,
    placeholder?: string,
    reference: MutableRefObject<HTMLInputElement | null >,
    callback: (value: string) => void,
    clear: () => void
}
export const SearchBox = ({ name, placeholder,  reference, callback, clear }: SearchBoxProps) => {

    const handleOnchange = debounce((e) => {
        if (e.target.value.length > 3) {
            console.log(e.target.value)
            if (!isStringEmpty(e.target.value)) {
                callback(e.target.value)
            }
        }
        if (e.target.value.length === 0) {
            clear()
        }   
    }, 1000)
    return (
        <div className={`searchbox`}>
            <input ref={reference} autoComplete='off' name={name} type='string' className="form-control" placeholder={placeholder ? placeholder : "Enter"}
                onChange={e => handleOnchange(e)} />
        </div>
    )
}
