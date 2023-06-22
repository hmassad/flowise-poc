import { useState } from 'react';

async function query(question) {
  const response = await fetch(
      "https://flowise-230612-production.up.railway.app/api/v1/prediction/07d6e13a-1064-4f75-b746-897d74c7e3af",
      {
          headers: {
            Authorization: "Bearer AtmYzHVZmFCRVZnodOtR+S/IaUYK8cNgpEFYhRIWDI8=",
            // "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            // chatflowid: "07d6e13a-1064-4f75-b746-897d74c7e3af",
            question: question,
            // role: "userMessage",
          }),
      }
  );
  const ttt = await response.text();
  if(!response.ok) {
    throw new Error(ttt);
  }
  return ttt;
}

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [lines, setLines] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setLines(prev => [...prev, question])
      const text = await query(question);
      setLines(prev => [...prev, text])
      setQuestion('');
    }catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setQuestion(e.target.value)} />
        <button type="submit" disabled={isLoading}>Submit</button>{isLoading ? 'Loading...' : ''}
      </form>
      <div>{lines.map((line, index) => <p key={index}>{line}</p>)}</div>
    </div>
  )
}
