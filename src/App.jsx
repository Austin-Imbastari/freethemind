import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Loader from "./components/Loader";
import "./App.css";

function App() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState([]);
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
        setResult([...result, res.data.data[0].url]);
        // setLoading(!loading);
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
                            <div className='img-container'>
                                <img src={res} alt='' />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
