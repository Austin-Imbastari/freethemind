import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Loader from "./components/Loader";
import "./App.css";

function App() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState([]);
    // const [text, setText] = useState();
    // const [loading, setLoading] = useState(false);

    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    const generateImage = async () => {
        const res = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "512x512",
        });
        console.log(res.data.data[0].url);
        // setText(prompt);
        setResult([...result, { img: res.data.data[0].url, title: prompt }]);
        // setLoading(!loading);
    };

    // adding the promiot to specific images create an obkect with the prompt { img: result, textPrompt: text}

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
                        console.log(res);
                        return (
                            <>
                                <div className='container'>
                                    <div className='img-container'>
                                        <img src={res.img} alt='' />
                                    </div>
                                    <div className='overlay'>
                                        <div className='content'>
                                            <p>{res.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
