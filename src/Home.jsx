import './index.css';
import axios from 'axios'
import { useState } from 'react'

export default function Home() {
    const [file, setFile] = useState(null)
    const [language, setLanguage] = useState('');
    const [version, setVersion] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', language);
        formData.append('version', version);

        console.log(formData)

        try{
            const response1 = await axios.post('http://localhost:5001/generate', formData);
            const response2 = await axios.post('http://localhost:5002/upload_file', formData);
            console.log(response1.data.message);
            console.log(response2.data.message);
            
        } catch (err) {
            console.error('error:', err);
            alert(err);
        }
    }

    return (
        <div className="h-screen font-sans text-gray-900 bg-gray-300 border-box">
            <div className="flex justify-center w-full mx-auto sm:max-w-lg">

                <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                    <div className="mt-10 mb-10 text-center">
                        <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
                        <p className="text-xs text-gray-500">File should be .zip format</p>
                    </div>
                    <form onSubmit={handleUpload} className="relative w-4/5 h-96 max-w-xs mb-10 bg-white  ">
                        <label className="block font-semibold mt-2"> Language </label>
                        <input type="text" placeholder="Language" name="language" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" onChange={(e) => setLanguage(e.target.value)}/>
                        <label className="block font-semibold mt-2"> Version </label>
                        <input type="text" placeholder="Version" name="version" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" onChange={(e) => setVersion(e.target.value)}/>
                        <input type="file" id="file-upload" className="hidden" onChange={handleFileChange}/>
                        <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-2/5 mt-4 cursor-pointer rounded-lg shadow-inner">
                            {file ? (
                                <p className="z-10 text-xs font-light text-center text-gray-500">{file.name}</p>
                            ) : (
                                <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                            )}
                            <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                            </svg>
                        </label>
                        <button type="submit" className="mt-4 w-full py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">Generate</button>
                    </form>
                </div>
            </div>
        </div>
    )
}