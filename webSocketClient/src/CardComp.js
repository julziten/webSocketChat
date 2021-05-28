import React from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar } from 'antd';
const { Meta } = Card;

export const CardComp = ({ message, state }) => {
    return (
        <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: state.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
            <Meta
                avatar={
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
                }
                title={message.user+":"}
                description={message.msg}
            />
        </Card> 
    )
}
