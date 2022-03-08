import React, { useContext } from 'react';
import { SocketContext } from '../Context'

function Email(props) {
    const { formState, handleChange, handleSubmit } = useContext(SocketContext)
    return (
        <div>
            <div className='email'>
            <div>Send A Short Email: </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='to'>Enter Email: </label>
                <input type="email" id='to' required placeholder='Email' value={formState.to} onChange={handleChange} />
                <label htmlFor='subject'>Enter Subject: </label>
                <input type="text"  id='subject' required placeholder='Subject: ' value={formState.subject} onChange={handleChange}/>
                <label htmlFor='body'>Enter Message: </label>
                <textarea type="text-area" id='body' maxLength={250} required placeholder='Message: ' value={formState.body} onChange={handleChange}/><br />
                <button variant="outline-success" onClick={handleSubmit}>Send</button>
            </form>
        </div>
        </div>
    );
}

export default Email;