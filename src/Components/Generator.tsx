import resetIcon from '../Icons/restart-svgrepo-com.svg';
import clipBoardIcon from '../Icons/clipboard-copy-duplicate-paste-svgrepo-com.svg';
import { useCallback, useState } from 'react';



const Generator = () => {

    const Sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms * 1000));
    }

    interface settingsDict {
        [key: string]: boolean | number;
    }

    interface Symbols {
        [key: string]: string
    }
    
    const symbols: Symbols = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        specialchars: '!@#$%^&*()_+=-'
    }

    const [settings, setSettings] = useState<settingsDict>({uppercase: true, lowercase: true, specialchars: true, numbers: true, length: 4});
    const [sliderLen, setsliderLen] = useState(4);
    const [generating, switchGenerating] = useState(false);

    const checkboxHandler = (event: any) => {
        const checkbox = {name: event.target.name, value: event.target.checked};
        setSettings(
            {
                ...settings,
                [checkbox.name]: checkbox.value 
            }
        );
    }

    const sliderHandler = (event: any) => {
        setsliderLen(Number(event.target.value))
        setSettings(
            {
               ...settings,
               length: Number(event.target.value)
            }
        );
    }

    const [ password, setPassword ] = useState("");


    const getRandom = (max: number) => {
        return Math.floor(Math.random() * max);
    }

    const getRandomChar = (symbols: any) => {
        let random_index = getRandom(Object.keys(symbols).length as number)

        const random_section:string = symbols[Object.keys(symbols)[random_index]] as string;

        return random_section[getRandom(random_section.length)]
    }

    const generate = async () => {
        if(generating) return;
        switchGenerating(true);
        const filteredKeys: (keyof Symbols)[] = Object.keys(symbols).filter(key => settings[key])

        const usable_symbols:Partial<Symbols> = filteredKeys.reduce((acc, key) => {
            acc[key] = symbols[key];
            return acc;
        }, {} as Partial<Symbols>);

        if(Object.keys(usable_symbols).length === 0) {
            switchGenerating(false); 
            return;
        }

        let pass:string = ''

        for(let i: number = settings.length as number; i > 0; i--) {
            await generatorAnimation(usable_symbols, pass);
            pass += getRandomChar(usable_symbols);
            setPassword(pass);
        }
        switchGenerating(false);
    }


    const generatorAnimation = async (symbols: any, pass: string) => {
        const animation_time:number = .1;
        const animation_increment:number = 0.01;
        let current_time:number = 0;
        
        let base_value:string = pass;

        let char = '';
        while(current_time <= animation_time){
            
            char = await getRandomChar(symbols);
            setPassword(base_value + char)

            current_time += animation_increment;
            await Sleep(animation_increment);
        
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert('Copied to clipboard!');
    }

    return (
        <div id="generator">
            <div id="top">
                <div id="input">
                    <input type="text" id="password" placeholder='Password' value={password}/>
                    <img src={resetIcon} className="icon reset" alt="Reset" onClick={() => setPassword('')}/>
                    <img src={clipBoardIcon} className='icon copy' alt="Copy to clipboard" onClick={() => copyToClipboard()}/>
                </div>
            </div>
            <div id="bottom">
                <div className="checkbox">
                    <input type="checkbox" name='uppercase' onChange={checkboxHandler} defaultChecked/>
                    <div id="title">Uppercase</div>
                </div> 
                <div className="checkbox">
                    <input type="checkbox" name='lowercase' onChange={checkboxHandler} defaultChecked/>
                    <div id="title">Lowercase</div>
                </div> 
                <div className="checkbox">
                    <input type="checkbox" name='specialchars' onChange={checkboxHandler} defaultChecked/>
                    <div id="title">Special Characters</div>
                </div> 
                <div className="checkbox">
                    <input type="checkbox" name='numbers' onChange={checkboxHandler} defaultChecked/>
                    <div id="title">Numbers</div>
                </div> 
                <div className="slider">
                    <input type="range" name='length' onChange={sliderHandler} min={1} max={20} defaultValue={4}/>
                    <div id="title">Length {sliderLen}</div>
                </div> 
                <div id="generateButton" onClick={generate}>Generate</div> 
            </div>
        </div>
    )
}

export default Generator;