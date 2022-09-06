import React, { useState } from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'

const Sidebar = () => {

    const [isChat, setIschat] = useState(false);

    const makeChat = () => {
        setIschat(false);
    }
    return (
        <div className='sidebar'>
            <Navbar />
            <Search makeChat={makeChat} />
            <Chats isChat={isChat} />
        </div>
    )
}

export default Sidebar