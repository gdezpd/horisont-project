import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap";
import { useDebounce } from "../../hooks/useDebounce";
import { searchValue } from "../../store/slice/sliceRoot";
import { useAppDispatch } from "../../store/store";


export const SearchForm = () => {

    const dispatch = useAppDispatch()

    const [value, setValue] = useState('')
    const debounceValue = useDebounce(value)

    useEffect(() => {
        dispatch(searchValue(debounceValue))
    }, [debounceValue])

    return (
        <Form style={{ width: '100%', padding: '0 10px' }}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                    type='Search'
                    placeholder='Search by title'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Form.Group>
        </Form>
    )
}
