import React, { useEffect, useState } from 'react';
import { Button, Card, Icon, Image, Input, List, Label, ListItem} from 'semantic-ui-react'
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';

const TYPE_COLORS = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
  normal: '#A8A878',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0',
};

const PokemonCard = ({pokemonID}) => {
    const [data, setData] = useState(null); // store the result here
    const [spriteIndex, setSpriteIndex] = useState(0);
    useEffect(() => {
        //AXIOS GET ON THE POKEAPI PT 
        const data = { id: 100 };  
  
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`, {
        params: data,  
        })  
        .then((response) => {  
            console.log("Success:", response.data);  
            setData(response.data);
        })  
        .catch((error) => {  
            console.error("Error:", error);  
        });  

    }, [pokemonID]);
    
    const allSpriteUrls = data ? Object.values(data.sprites).filter(s => typeof s === 'string') : [];
    const otherSprites = allSpriteUrls.filter(url => url !== data?.sprites?.front_default);
    const spriteUrls = data?.sprites?.front_default ? [data.sprites.front_default, ...otherSprites] : allSpriteUrls;

    const nextSprite = () => {
        console.log("Button was clicked! Current index:", spriteIndex);
        setSpriteIndex((prev) => (prev + 1) % spriteUrls.length);
    };
    
return (
    <div style={{
      background: 'white',
      padding: '20px',          // This creates the white space around the card
      border: '2px solid #8b8b8b', // The thin outer grey line
      borderRadius: '25px',     // Large rounded corners like the image
      display: 'inline-block',  // Keeps the container tight around the card
      margin: '10px'
  }}>
    <Card centered>
      <div style={{ backgroundColor: '#f2f2f2', padding: '20px', textAlign: 'center' }}>
        {spriteUrls.length > 0 && (
          <Image 
            src={spriteUrls[spriteIndex]} 
            size='small' 
            centered 
          />
        )}
          {spriteUrls.length > 1 && (
            <Button 
              icon='refresh' 
              circular 
              onClick={nextSprite} 
              style={{ marginTop: '10px' }}
              content={"Next Sprite"}
            />
          )}
      </div>

      <Card.Content>

        <Card.Header style={{ textTransform: 'capitalize' }}>
          {data?.name}
        </Card.Header>


        <div style={{ margin: '10px 0' }}>
          {data?.types.map((type) => (
            <Label 
              key={type.type.name} 
              size='tiny'
              style={{
                backgroundColor: TYPE_COLORS[type.type.name] || '#777',
                color: 'white',
                textTransform: 'uppercase',
                textShadow: `
                  -1px -1px 0 #000,  
                  1px -1px 0 #000,
                  -1px  1px 0 #000,
                  1px  1px 0 #000`
                }}
            >
              {type.type.name}
            </Label>
          ))}
        </div>

        <List divided>
          {data?.stats.map((stat) => (
            <List.Item key={stat.stat.name}>
              <span style={{ float: 'left', color: 'gray' }}>{stat.stat.name}</span>
              <span style={{ float: 'right', fontWeight: 'bold' }}>{stat.base_stat}</span>
            </List.Item>
          ))}
        </List>
        <List divided>
          <List.Item key="height">
            <span style={{ float: 'left', color: 'gray' }}>{"Height"}</span>
            <span style={{ float: 'right', fontWeight: 'bold' }}>{data?.height}</span>
          </List.Item>
          <List.Item key="weight">
            <span style={{ float: 'left', color: 'gray' }}>{"Weight"}</span>
            <span style={{ float: 'right', fontWeight: 'bold' }}>{data?.weight}</span>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  </div>
);
}

export {PokemonCard};