require ('dotenv').config()
const express = require('express')
const {response} = require("express");
const cors = require("cors");
XMLHttpRequest = require('xhr2');
const axios = require('axios');

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000


let current_currency = '';
let current_value = '';



const start = () => {
    try {
        app.listen(PORT, ()=>console.log(`back onload port: ${PORT}`));
    }catch(error){
        console.log(error)
    }
}



app.get('/new_val', async (req,res)=>{
    current_value = req.query.val
    current_currency = req.query.curen
    const list = req.query.list
    if( current_value == ''){
        const result = list.split(',').map(element=>{return {
            curen:element,
            value:''
        }
        })
        res.json(result)
    }else if( current_value == '0'){
        const result = list.split(',').map(element=>{return {
            curen:element,
            value:'0'
        }
        })
        res.json(result)
    }else if( Number(current_value) <= 0){
        const result = list.split(',').map(element=>{return {
            curen:element,
            value:current_value
        }
        })
        res.json(result)
    }
    let data = await makeRequest(process.env.URL+'?'+process.env.BASE+current_currency+process.env.AMOUNT+current_value+process.env.SYMBOLS+list)
    const result = list.split(',').map(element=>{return {
        curen:element,
        value:(data.rates[element])
    }
    })
    res.json(result)
})


app.get('/start_val', async (req,res)=>{
    const curren = ['USD','EUR','RUB','BYN']
    current_currency = 'USD'
    current_value = '1'
    let data = await makeRequest(process.env.START_URL)
       let start_v =  curren.map(element=>{return {
            curen:element,
            value:data.rates[element]
        }
        })
    res.json(start_v)
})

app.get('/options', async (req,res)=>{
    const curren = ['USD','EUR','RUB','BYN']

    let data = await makeRequest(process.env.URL)
    let start_v =  Object.keys(data.rates).filter(element=> !curren.includes(element))
    res.json(start_v)
})

app.get('/delete_options', async (req,res)=>{
    const currency = req.query.list
    const val = req.query.val
    let data = await makeRequest(process.env.URL)
    let start_v =  Object.keys(data.rates).filter(element=> currency.includes(element) && element!=val)
    res.json(start_v)
})

app.get('/choose_input', async (req,res)=>{
    const currency = req.query.curren
    let data = await makeRequest(process.env.URL+'?'+process.env.BASE+current_currency+process.env.AMOUNT+current_value+process.env.SYMBOLS+currency)
    let result = {
        curen: currency,
        value: data.rates[currency]
    }
    res.json(result)
})

async function makeRequest(url) {
    const response = await axios.get(url);
    return response.data;
}



const defaultState = (str) => {
    try{
        let requestURL = str;
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = async function() {
            let obj =  await request.response;
        }
    }catch(error){
        console.log(error)
    }
}
defaultState (process.env.URL
)

start()
