import { useState,useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';


function App() {
  const [books, setBooks] = useState([]);
 
  const fetchbooks = async() =>{
    const username =  "rehman";
    const resp = await axios.get('http://localhost:5001/getone',{username})
    setBooks(resp.data.data);
    console.log(resp.data.data);
  }
  useEffect( () =>{
    fetchbooks();
        },[]); 
    
  const deleteBookById = async(book) => {
  
    console.log(book);
const resp= await axios.delete('http://localhost:5001/delete',{data:{book:book}});
console.log(resp);
  window.location.reload();
  };

  const createBook = async(title) => {
     const resp = await axios.post('http://localhost:5001/register',{
      title,
      username:"rehman"
     });

console.log(resp);
window.location.reload();


    
  };

  return (
    <div className="app">
     <BookList books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
      
    </div>
  );
}

export default App;
