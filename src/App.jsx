import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState(null);
    const configuration = new Configuration({
        apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);
    const generateImage = async () => {
        const res = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "520x520",
        });

        console.log(res.data.data[0].url);
        setResult(res.data.data[0].url);
    };

    return (
        <div className='App'>
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
                    <button onClick={generateImage}>Generate Image</button>
                </div>

                <img src={result} alt='' />
            </div>
        </div>
    );
}

export default App;
