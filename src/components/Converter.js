import { useEffect, useState } from 'react';
import { countryList } from './../utils/currencyCodes';
import { FcRefresh } from "react-icons/fc";

function Converter() {
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('INR');
    const [amount, setAmount] = useState();
    const [rate, setRate] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(function () {
        async function getRate() {
            try {
                const res = await fetch(`https://v6.exchangerate-api.com/v6/f9838ecbe722b83198a38bd5/latest/${from}`);
                if (!res.ok) {
                    throw new Error('API error');
                }
                const data = await res.json();
                setRate(data.conversion_rates[to]);
                setConvertedAmount(0);
            } catch (err) {
                console.log(err);
            }
        }
        getRate();
    }, [from, to]);

    function handleSetAmount() {
        setConvertedAmount(amount * rate);
    }

    function handleFlip() {
        const temp = from;
        setFrom(to);
        setTo(temp);
    }
    //bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700

    return (
        <div className='flex px-40 py-10 w-full justify-center bg-gray-50 mx-auto' >
            <div className='shadow-md flex flex-col p-10 items-stretch gap-5 w-full ' >
                <div className='flex flex-col' >
                    <h3 className='text-start text-gray-800 ' >Enter amount</h3>
                    <input className='border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-3' min="1" type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                </div>
                <div className='flex flex-col' >
                    <h3 className=' text-gray-800 '>From</h3>
                    <select className='border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-1 mb-3' value={from} onChange={(e) => setFrom(e.target.value)}>
                        {Object.keys(countryList).map(el =>
                            <option value={el} key={el} >{el}</option>
                        )}
                    </select>
                </div>
                <div className='flex justify-center' >
                    <button className='' onClick={handleFlip} ><FcRefresh /></button>
                </div>
                <div className='flex flex-col' >
                    <h3 className=' text-gray-800 '>To</h3>
                    <select className='border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-1 mb-3' value={to} onChange={(e) => setTo(e.target.value)} >
                        {Object.keys(countryList).map(el =>
                            <option value={el} key={el} >{el}</option>
                        )}
                    </select>
                </div>
                <div className='flex justify-center ' >
                    <button className='bg-blue-500 hover:bg-blue-300 rounded-lg p-1 text-gray-800 w-full ' onClick={handleSetAmount} >Convert</button>
                </div>
                {convertedAmount > 0 &&
                    <div className='bg-blue-300 rounded-md flex justify-center' >
                        <p className='text-gray-800' >{amount} {from} is {rate*amount} {to}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Converter
