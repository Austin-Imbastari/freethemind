import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Configuration, OpenAIApi } from "openai";

import "./App.css";

function App() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState([]);
    // const [text, setText] = useState();
    // const [loading, setLoading] = useState(false);
    const configuration = new Configuration({
        apiKey: import.meta.env.VITE_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const generateImage = async () => {
        try {
            const res = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "512x512",
            });
            // console.log(res.data.data[0].url);
            // setText(prompt);
            setResult([...result, { img: res.data.data[0].url, title: prompt }]);
            // setLoading(!loading);
        } catch (e) {
            console.log(e);
            alert("Error,there was something wrong, please try again.");
        }
    };

    return (
        <div className='App'>
            <div className='nav-bar'>
                <nav>
                    <h1>Free The Mind</h1>
                </nav>
            </div>
            <div className='main-container'>
                <div className='input-container'>
                    <p>
                        <i> Add a detailed description for the best outcome :)</i>
                    </p>
                    <input
                        type='text'
                        placeholder='Punk rock show with people in a mosh pit....'
                        onChange={(e) => {
                            setPrompt(e.target.value);
                        }}
                    />
                    <button onClick={generateImage}>
                        <h3>CREATE</h3>
                    </button>
                </div>

                <div className='img-grid-container'>
                    {result.map((res) => {
                        return (
                            <div key={uuidv4()}>
                                <div className='container'>
                                    <div className='img-container'>
                                        <img src={res.img} alt='' />
                                    </div>
                                    <a href={res.img} target='_blank'>
                                        <div className='overlay'>
                                            <div className='content'>
                                                <p>{res.title}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
