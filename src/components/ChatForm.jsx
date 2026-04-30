
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Icon, Image, Input, List, Label} from 'semantic-ui-react'
import axios from 'axios';
import {CHAT_API} from '../AppConfig';

// HANDLES INTERACTIONS WITH THE LLM (/backend)
const ChatForm = ({setSearchResults})=>{
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const chat = (searchQuery)=>{
        // AXIOS GET on the POKECHAT API POINT 
        if (!searchQuery) {
            searchQuery="ditto limit 1"
        }
        if(isLoading) return;

        setIsLoading(true);
        setError(null);

        axios.get(`${CHAT_API}/chat/query`, {params: {q: searchQuery}})
            .then((response)=>{
                if( Array.isArray(response.data)) {
                    const idxs = response.data.map(pokemon => pokemon.id);
                    setSearchResults(idxs);
                } else {
                    console.error("LLM Error:", response.data.error || "Unknown error");
                    setError("The AI returned an invalid response.")
                }
            })
            .catch((error)=>console.error("Chat Error:", error))
            .finally(() => {
                setIsLoading(false); 
            });
    };

    return (
    <div className='chat'>
        {error && (
          <Label color='red' pointing='below' style={{ marginBottom: '10px', display: 'block' }}>
          <Icon name='warning sign' /> {error}
          </Label>
        )}

        <Input 
        fluid 
        error={!!error}
        loading={isLoading}
        disabled={isLoading}
        onChange={(e)=>setQuery(e.target.value)}
        onKeyDown={(e)=>e.key === 'Enter' && chat(query)}
        icon={<Icon name='send' inverted circular link />}
        placeholder='Ask me a Pokemon Question...'
        />
        <Button onClick={() => chat("strongest pokemon limit 1")}>
          <Label pointing='above'> Strongest Pokemon </Label>
        </Button>
        <Button onClick={() => chat("weakest pokemon limit 1")}> 
          <Label pointing='above'> Weakest Pokemon </Label>
        </Button>
        <Button onClick={() => chat("starter pokemon limit 3")}>
          <Label pointing='above' > Starter Pokemon </Label>
        </Button>
    </div>
    );
}

export {ChatForm};
