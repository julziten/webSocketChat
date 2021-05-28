import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { CardComp } from './CardComp';

const { Search } = Input;

const { Text } = Typography;

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export const App = () => {

    const [ state, setState ] = useState({
        userName: '',
        isLoggedIn: false,
        messages: []
    })

    const onButtonClicked = ( value ) => {
        client.send(JSON.stringify({
            type: 'message',
            msg: value,
            user: state.userName
        }));
        setState({
            ...state,
            searchVal: ''
        })
    }

    useEffect(() => {
        client.onopen = () => {
            console.log('Websocket client connected')
        };
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('Got reply', dataFromServer);
            if (dataFromServer.type === "message") {
                setState((state) =>
                  ({
                    ...state,
                    messages: [...state.messages,
                    {
                      msg: dataFromServer.msg,
                      user: dataFromServer.user
                    }]
                  })
                );
              }
        };
    }, [state]);

    return (
        <div>
            {
                state.isLoggedIn 
                ?
                <div>
                    <div className="title">
                        <Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>Websocket Chat: {state.userName}</Text>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }} id="messages">

                        { state.messages.map(message => (
                            <CardComp message={message} state={state}/>
                        ))}

                    </div>
                    
                    <div className="bottom">
                        <Search
                            placeholder="Send Message"
                            enterButton="Send"
                            value={state.searchVal}
                            size="large"
                            onChange={(e) => setState({ 
                                ...state,
                                searchVal: e.target.value 
                            })}
                            onSearch={value => onButtonClicked(value)}
                        />
                    </div> 
                </div>
                :
                <div style={{ padding: '200px 40px' }}>
                    <Search
                    placeholder="Enter Username"
                    enterButton="Login"
                    size="large"
                    onSearch={ value => setState({
                        ...state,
                        isLoggedIn: true,
                        userName: value
                    })}
                    />
                </div>
            }
        </div>
    )
}
