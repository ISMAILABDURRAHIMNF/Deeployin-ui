import './index.css';
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react'

export default function Home() {
    const [file, setFile] = useState(null)
    const [language, setLanguage] = useState('');
    const [desc, setDesc] = useState('');
    const [srcPort, setSrcPort] = useState('');
    const [dstPort, setDstPort] = useState('');
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [isHaveImage, setIsHaveImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dockerData, setDockerData] = useState([]);
    const [loadingAction, setLoadingAction] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(null);

    useEffect(() => {
        const checkImage = async () => {
            const data = {
                token
            }
            try {
                const response = await axios.post('http://localhost:5002/get_docker_data', data);
                console.log(response);

                if (response.data.docker_data == null ||  response.data.docker_data.length == 0){
                    setIsHaveImage(false);
                } else {
                    setDockerData(response.data.docker_data);
                    console.log(dockerData);
                    setIsHaveImage(true);
                }
                setLoading(false);
            } catch (err){
                console.error('error: ', err);
                alert(err);
            }
        }

        checkImage()
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('token', token);
        formData.append('language', language);
        formData.append('desc', desc);
        formData.append('srcport', srcPort)
        formData.append('dstport', dstPort)
        
        console.log(formData)

        try{
            const response1 = await axios.post('http://localhost:5001/generate', formData);
            const response2 = await axios.post('http://localhost:5002/upload_file', formData);
            console.log(response1);
            console.log(response2);
            
            if(response1.data.status == 200 && response2.data.status == 200 ){
                window.location.reload();
            }
        } catch (err) {
            console.error('error:', err);
            alert(err);
        } finally {
            setLoading(false);
        }

    }

    const handleAction = async (id_container, status) => {
        setLoadingAction(id_container);
        try{
            const action = status == 'stopped' ? 'start_container' : 'stop_container';
            const response = await axios.post(`http://localhost:5002/${action}`, {"id" : id_container});
            console.log(response);
        } catch (err) {
            console.error('error:', err);
            alert(err);
        } finally {
            setLoadingAction(null);
            window.location.reload();
        }
    }

    const handleHapus = async (id_container) => {
        const pilihanUser = confirm("Apakah yakin ingin menghapus container, image beserta file appnya?");

        if(pilihanUser){
            setLoadingDelete(id_container);
            try{
                const response = await axios.post('http://localhost:5002/delete', {"id" : id_container})
                console.log(response);
            } catch (err){
                console.error('error:', err);
                alert(err);
            } finally {
                setLoadingDelete(null);
                window.location.reload();
            }
        }
    }

    const handleLogout = async () => {
        const data = new FormData();
        data.append('token', token);
        console.log(data)
        try{
            const response = await axios.post('http://localhost:5002/logout', data);
            console.log(response);
            localStorage.removeItem('token')
            window.location.replace('login')
        } catch (err){
            console.error('error:', err);
            alert(err);
        }
    }

    return (
        <div className="h-screen font-sans text-gray-900 bg-gray-300 border-box">
            {loading ?(
                <div className="flex justify-center w-full mx-auto sm:max-w-lg">
                    <div className="flex flex-col items-center justify-center w-full h-auto my-80">
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-end p-4">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500 focus:outline-none"
                        >
                            Logout
                        </button>
                    </div>
                    {isHaveImage ?(
                        <div className="flex justify-center mx-auto w-4/6">
                            <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:rounded-lg sm:shadow-xl">
                            <table className="table-auto w-11/12 m-2">
                                <thead>
                                    <tr>
                                    <th>Container</th>
                                    <th>Dockerfile</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dockerData.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td><a href={item.dockerfile} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" download="Dockerfile">Download</a></td>
                                            <td className='text-center'>{item.status}</td>
                                            <td className='text-center'>
                                                <button onClick={() => handleAction(item.id, item.status)} disabled={loadingAction === item.id}>
                                                    {loadingAction === item.id ? "..." : item.status == 'stopped' ? "Start" : "Stop"}
                                                </button>|
                                                <button onClick={() => handleHapus(item.id)} disabled={loadingDelete === item.id}>
                                                    {loadingDelete === item.id ? "..." : "Hapus"}
                                                </button>
                                            </td> 
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center w-full mx-auto sm:max-w-lg">
                            <div className="flex flex-col items-center justify-center w-full h-auto bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                                <div className="mt-10 mb-5 text-center">
                                    <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
                                    <p className="text-xs text-gray-500">File should be .zip format</p>
                                </div>
                                <form onSubmit={handleUpload} className="relative w-4/5 h-96 max-w-xs mb-10 bg-white  ">
                                    <label className="block font-semibold mt-2"> Language </label>
                                    <input type="text" placeholder="Language" name="language" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" onChange={(e) => setLanguage(e.target.value)}/>
                                    <label className="block font-semibold mt-2"> Description </label>
                                    <input type="text" placeholder="Desc" name="desc" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" onChange={(e) => setDesc(e.target.value)}/>
                                    <div className="flex space-x-2">
                                        <input type="text" placeholder="Src Port" name="srcPort" className="border w-full h-5 px-3 py-5 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" onChange={(e) => setSrcPort(e.target.value)} />
                                        <input type="text" placeholder="Dst Port" name="dstPort" className="border w-full h-5 px-3 py-5 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" onChange={(e) => setDstPort(e.target.value)} />
                                    </div>
                                    <input type="file" id="file-upload" className="hidden" onChange={handleFileChange}/>
                                    <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-1/5 mt-4 cursor-pointer rounded-lg shadow-inner">
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
                    )}
                </div>
            )}
        </div>
    )

    // if(loading){
    //     return (
    //         <div className="h-screen font-sans text-gray-900 bg-gray-300 border-box">
    //             <div className="flex justify-center w-full mx-auto sm:max-w-lg">
    //                 <div className="flex flex-col items-center justify-center w-full h-auto my-80">
    //                     <div role="status">
    //                         <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    //                             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    //                         </svg>
    //                         <span className="sr-only">Loading...</span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    // return (
    //     <div className="h-screen font-sans text-gray-900 bg-gray-300 border-box">
    //                 {isHaveImage ?(
    //                     <div className="flex justify-center mx-auto w-4/6">
    //                         <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:rounded-lg sm:shadow-xl">
    //                         <table className="table-auto w-11/12 m-2">
    //                             <thead>
    //                                 <tr>
    //                                 <th>Container</th>
    //                                 <th>Dockerfile</th>
    //                                 <th>Status</th>
    //                                 <th>Action</th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody>
    //                                 {dockerData.map((item) => (
    //                                     <tr key={item.id}>
    //                                         <td>{item.name}</td>
    //                                         <td>{item.dockerfile}</td>
    //                                         <td className='text-center'>{item.status}</td>
    //                                         <td className='text-center'>
    //                                             <button onClick={() => handleAction(item.id, item.status)} disabled={loadingAction === item.id}>
    //                                                 {loadingAction === item.id ? "Loading.." : item.status == 'stopped' ? "Start" : "Stop"}
    //                                             </button>|
    //                                             <button onClick={() => handleHapus(item.id)} disabled={loadingDelete === item.id}>
    //                                                 {loadingDelete === item.id ? "Loading.." : "Hapus"}
    //                                             </button>
    //                                         </td> 
    //                                     </tr>
    //                                 ))}
    //                             </tbody>
    //                         </table>
    //                         </div>
    //                     </div>
    //                 ) : (
    //                     <div className="flex justify-center w-full mx-auto sm:max-w-lg">
    //                         <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
    //                             <div className="mt-10 mb-10 text-center">
    //                                 <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
    //                                 <p className="text-xs text-gray-500">File should be .zip format</p>
    //                             </div>
    //                             <form onSubmit={handleUpload} className="relative w-4/5 h-96 max-w-xs mb-10 bg-white  ">
    //                                 <label className="block font-semibold mt-2"> Language </label>
    //                                 <input type="text" placeholder="Language" name="language" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" onChange={(e) => setLanguage(e.target.value)}/>
    //                                 <label className="block font-semibold mt-2"> Description </label>
    //                                 <input type="text" placeholder="Desc" name="desc" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" onChange={(e) => setDesc(e.target.value)}/>
    //                                 <label className="block font-semibold mt-2"> Port </label>
    //                                 <input type="text" placeholder="Desc" name="desc" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" onChange={(e) => setPort(e.target.value)}/>
    //                                 <input type="file" id="file-upload" className="hidden" onChange={handleFileChange}/>
    //                                 <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-2/5 mt-4 cursor-pointer rounded-lg shadow-inner">
    //                                     {file ? (
    //                                         <p className="z-10 text-xs font-light text-center text-gray-500">{file.name}</p>
    //                                     ) : (
    //                                         <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
    //                                     )}
    //                                     <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //                                         <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
    //                                     </svg>
    //                                 </label>
    //                                 <button type="submit" className="mt-4 w-full py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">Generate</button>
    //                             </form>
    //                         </div>
    //                     </div>
    //                 )}
    //     </div>
    // )
}