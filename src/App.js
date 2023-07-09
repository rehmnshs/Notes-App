import { useState,useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';


function App() {
  const [books, setBooks] = useState([]);
 
  const fetchbooks = async() =>{
    const resp = await axios.get('http://localhost:3001/books')
    setBooks(resp.data);
  }
  useEffect( () =>{
    fetchbooks();
        },[]); 
    
  const deleteBookById = async(id) => {
const resp= await axios.delete(`http://localhost:3001/books/${id}`)
console.log(resp);
   const updatedBooks = books.filter((book)=>{
return book.id !==id;
   });
  
    setBooks(updatedBooks);
  };

  const createBook = async(title) => {
     const resp = await axios.post('http://localhost:3001/books',{
      title
     });

console.log(resp);


   const updatedBooks = [
      ...books,
      resp.data
    ];
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <BookList books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
      
    </div>
  );
}

export default App;
