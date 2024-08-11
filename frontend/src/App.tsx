import { useRef, useState } from 'react';

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!Array.isArray(files) || files.length < 1) {
      return;
    }

    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if(reader.result) {
          const base64String = reader.result.toString();
          setBase64Image(base64String);
        }
      }
      reader.readAsDataURL(file);
    });
  }

  const hadleUpload = async () => {
    const payload = {
      data: base64Image
    };

    try {
      const response = await fetch('http://localhost:3000/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if(response.ok) {
        console.log("アップロード成功");
      } else {
        console.log("アップロード失敗");
      }
    } catch(err) {
      console.error("アップロードエラー", err);
    } finally {
      setBase64Image(null)
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <>
      <input 
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleInputFile}
        ref={inputRef}
      />
      {base64Image && (
        <div>
          <img src={base64Image} alt='Preview' style={{ maxWidth: '300px'}} />
        </div>
      )}
      <button onClick={hadleUpload}>画像投稿</button>
    </>
  )
}

export default App
