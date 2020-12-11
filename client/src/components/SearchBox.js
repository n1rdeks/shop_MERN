import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const SearchBox = ({ history }) => {
    const [searchKeyword, setSearchKeyword] = useState('');

    const submitHandler = e => {
        e.preventDefault();

        if (searchKeyword.trim()) {
            history.push(`/search/${searchKeyword}`);
        } else {
            history.push('/');
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control type='text' name='q' onChange={e => setSearchKeyword(e.target.value)}
                          placeholder='Search Products...' className='mr-sm-2 ml-sm-5'>
            </Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
        </Form>
    );
};

export default SearchBox;