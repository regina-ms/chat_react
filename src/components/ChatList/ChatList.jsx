import Message from '../Message/Message';
import React, { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid';
import { useLocalStorage } from '../../useLocalStorage';
import InputMessage from '../InputMessage/InputMessage';
import { animateScroll } from 'react-scroll';

export default function ChatList() {
    const [local] = useLocalStorage('userId', nanoid());
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(true)

    const [state, setState] = useState([]);

    const [buttonLoad, setButtonLoad] = useState(false);

    const loadMessage = (id) => fetch(`http://localhost:7070/messages?from=${id}`)
        .then(res => res.json())
        .then(res => {
            setState([...state, ...res]);

        })

    useEffect(() => {
        setTimeout(() => {
            state.length ? loadMessage(state[state.length - 1].id) : loadMessage(0);
            setLoading(false)
            setButtonLoad(false)
        }, 2000)
        
    }, [state])

    useEffect(() => {
        if(state.length > 4) {
            animateScroll.scrollToBottom({
                smooth: true,
                containerId: 'scroll-container',
            }) 
        }  
    }, [state.length])


    const sendMessage = () => {
        if (inputRef.current.value) {
            fetch(`http://localhost:7070/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: state.length ? state[state.length - 1].id + 1 : 0,
                    userID: local,
                    content: inputRef.current.value
                })
            }).then(() => {
                setButtonLoad(true);
                inputRef.current.value = "";
            })
        }
    }

    const handlerClick = (e) => {
        e.preventDefault();
        sendMessage();
    }


    /*animateScroll.scrollToBottom({
                smooth: true,
                containerId: 'scroll-container',
            }) */

    return (
        <>
            <ul className='message-list' id='scroll-container'>
                {
                    loading ? <div>Loading</div> : state.map((el) => <Message key={el.id} message={el.content} className={el.userID === local ? 'my-message' : ''} />)
                }
            </ul>
            <InputMessage buttonClick={handlerClick} inputRef={inputRef} buttonLoad={buttonLoad} />
        </>
    )
}
