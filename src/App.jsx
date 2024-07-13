import { useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import { getLanguages, translateText } from './redux/actions'
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  const{isLoading, error, languages}= useSelector((store)=> store.languageReducer);

const translateState = useSelector((store)=> store.translateReducer);
console.log(translateState);

  const[sourceLang, setSourceLang] = useState({
    label:"Turkish",
    value: "tr",
  });

  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en"
  })

const handleSwap = () => {
 setSourceLang(targetLang);
 setTargetLang(sourceLang);
};
const[text, setText] = useState("");
  

  useEffect(()=>{
 dispatch(getLanguages());
  },[]);

  console.log(text);


  //! DİL DİZİNİ BİZDEN İSTENEN FORMATA ÇEVİRMEK İÇİN MAP İLE DÖNDÜK
  /**dizinin içinde her bir elemanın code ve name değerlerini value ve label değerlerine çevirdik
   * diziyi formatlama işleminde her render sırasında olmasını istemediğimiz için usememo kullanarak cache gönderdik.
    */
  const formatted = useMemo(
    () =>
      languages.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [languages]
  );
  
  const handleTranslate = () => {
    dispatch(translateText({sourceLang, targetLang, text}))
  }

  return (
   <div className="bg-zinc-900 h-screen text-white grid place-items-center ">
    <div className='w-[80vw] max-w-[1100px] flex flex-col justify-center'> 
<div>
<h1 className="text-center mb-7 text-4xl font-semibold">Çeviri +</h1>

{/**Üst kısım */}
<div className='flex gap-2 text-black'>
<Select onChange={(e)=> setSourceLang(e)} value={sourceLang} className='flex-1' options={formatted}/>
<button onClick={ handleSwap} className='bg-zinc-700 px-6 py-2 rounded hover:ring-2 hover:bg-zinc-800 text-white'>Değiş</button>
<Select onChange={(e)=> setTargetLang(e)} value={targetLang} className='flex-1' options={formatted}/>
</div>

{/**text alanları */}
<div className='flex mt-5 gap-3 md:gap-[105px] max-md:flex-col'>
<div className='flex-1 '>
  <textarea onChange={(e)=> setText(e.target.value)} className='w-full min-h-[300px] max-h-[500px]
   text-black p-[10px] text-[20px] rounded'></textarea>
</div>
<div className='flex-1 relative'>
  <textarea value={translateState.answer}
  disabled className='w-full min-h-[300px] max-h-[500px]
   text-gray-400 p-[10px] text-[20px] rounded'></textarea>
   {
    translateState.isLoading && ( 
   <div className='loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
    
    <div className="bar"></div>
   <div className="bar"></div>
   <div className="bar"></div>
   <div className="bar"></div>
   </div>
   )
  }
</div>

</div>

</div>
<button onClick={handleTranslate}  className='bg-zinc-700 mt-3 p-3 text-[17px] rounded hover:ring-2 hover:bg-zinc-900 transition'>Çevir</button>
   </div>
   </div>
  )
}

export default App
